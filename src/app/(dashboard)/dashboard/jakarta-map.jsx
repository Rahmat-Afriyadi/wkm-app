import mapDataIndonesia from "@/../public/data/gadm41_IDN_2.json";

export const generateChartMapKota = (dataWilayah) => {
  

  // Konfigurasi tampilan peta
  const featureJakartaPusat = mapDataIndonesia.features.find(
    (f) => f.properties.NAME_2?.toLowerCase().replace(/\s+/g, "") === "jakartapusat"
  );

  const targetWilayah = [
    "JakartaPusat", "JakartaUtara", "JakartaBarat", "JakartaTimur", "JakartaSelatan",
    "Bogor", "Depok", "KotaBekasi", "Bekasi", "KotaTangerang", "TangerangSelatan", "Tangerang"
  ];
  
  // Buat koleksi fitur wilayah target saja
  const focusedFeatures = mapDataIndonesia.features.filter(f =>
    targetWilayah.includes(f.properties.NAME_2)
  );
  
  // Gunakan fitur terfokus untuk fitToGeometry
  const mapFocusGeometry = {
    type: "FeatureCollection",
    features: focusedFeatures
  };
  
  // Mapping khusus untuk nama kota yang sulit dicocokkan dengan GeoJSON
  const specialMapping = {
    "DEPOK" : "Depok",
    "KAB. BEKASI" : "Bekasi",
    "KAB. BOGOR" : "Bogor",
    "BEKASI": "KotaBekasi",
    "Jakarta Barat": "JakartaBarat",
    "JAKARTA PUSAT": "JakartaPusat",
    "JAKARTA SELATAN": "JakartaSelatan",
    "JAKARTA TIMUR": "JakartaTimur",
    "JAKARTA UTARA": "JakartaUtara",
    "KAB. TANGERANG": "Tangerang",
    "TANGERANG": "KotaTangerang",
    "TANGERANG SELATAN": "TangerangSelatan"
  };
  
  // Koordinat manual untuk titik-titik (memastikan tidak ada yang tumpang tindih)
  const manualCoordinates = {
    "BEKASI": [107.0, -6.24],
    "Jakarta Barat": [106.78, -6.16],
    "JAKARTA PUSAT": [106.84, -6.18],
    "JAKARTA SELATAN": [106.82, -6.26],
    "JAKARTA TIMUR": [106.90, -6.21],
    "JAKARTA UTARA": [106.86, -6.13],
    "KAB. TANGERANG": [106.48, -6.17],
    "TANGERANG": [106.63, -6.17],
    "TANGERANG SELATAN": [106.68, -6.29]
  };
  if (!dataWilayah || !Array.isArray(dataWilayah.data)) {
    console.warn("Data wilayah tidak valid:", dataWilayah);
    return {}; // Atau return chart default kosong
  }
  // Transform data dari format API ke format Highcharts
  const transformedData = [];
  const pointData = [];
  
  dataWilayah.data.forEach(item => {
    // Cari nama yang sesuai di GeoJSON berdasarkan mapping khusus
    const mappedName = specialMapping[item.kota];
    
    if (mappedName) {
      // Cari fitur yang cocok di GeoJSON
      const matchingFeature = mapDataIndonesia.features.find(f => 
        f.properties.NAME_2 === mappedName
      );
      
      if (matchingFeature) {
        transformedData.push({
          id: matchingFeature.properties.ID_2,
          name: item.kota,
          value: item.jumlah,
          rawName: matchingFeature.properties.NAME_2
        });
      } else {
        // Tambahkan ke data point untuk titik merah
        if (manualCoordinates[item.kota]) {
          pointData.push({
            name: item.kota,
            value: item.jumlah,
            x: manualCoordinates[item.kota][0],
            y: manualCoordinates[item.kota][1]
          });
        }
      }
    } else {
      // Tambahkan ke data point untuk titik merah jika ada koordinat manual
      if (manualCoordinates[item.kota]) {
        pointData.push({
          name: item.kota,
          value: item.jumlah,
          x: manualCoordinates[item.kota][0],
          y: manualCoordinates[item.kota][1]
        });
      }
    }
  });

  // Cari nilai maksimum untuk colorAxis
  const maxValue = Math.max(...dataWilayah.data.map(item => item.jumlah));

  return {
    chart: {
      map: mapDataIndonesia,
      backgroundColor: "#f0f2f5",
      height: 800, 
      mapView: {
        fitToGeometry: {
          type: "FeatureCollection",
          features: focusedFeatures
        },
        padding: [10, 10, 10, 10],
        zoom: 10,
      },
      events: {
        load: function () {
          this.mapView.zoomBy(0.8)
        }
      }
    },
    title: {
      text: "Penjualan Berdasarkan Kota",
    },
    subtitle: {
      text: `Periode: ${dataWilayah.Dari} sampai ${dataWilayah.Sampai}`
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    colorAxis: {
      visible: false,
      min: 0,
      max: maxValue,
      minColor: '#E6F7FF',
      maxColor: '#0050B3',
      lineColor: '#000000',
      lineWidth: 0.5,
    },
    legend: {
      enabled: false 
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.name}</b><br>Jumlah: <b>{point.value}</b>'
    },
    series: [
      {
        mapData: mapFocusGeometry,
        data: transformedData,
        name: "Jumlah",
        joinBy: ['NAME_2', 'rawName'],
        borderColor: '#404040',
        borderWidth: 0.2,
        states: {
          hover: {
            color: "#BADA55",
            borderColor: '#000000',
            borderWidth: 1
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.value}",
          style: {
            color: 'black',
            textOutline: '1px white',
            fontWeight: 'bold',
            fontSize: '10px'
          }
        },
      },
      // Series tambahan untuk menampilkan data yang tidak cocok sebagai points
      {
        type: 'mappoint',
        name: 'Tidak Terdeteksi',
        data: pointData,
        color: '#FF0000',
        marker: {
          radius: 5,
          fillColor: '#FF0000',
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.value}',
          style: {
            fontWeight: 'bold',
            color: 'black', 
            textOutline: '1px white',
            fontSize: '10px'
          },
          y: -18 // Pastikan label di atas titik agar tidak tumpang tindih
        }
      }
    ],
    legend: {
      enabled: true,
      title: {
        text: 'Jumlah Data'
      }
    }
  };
};