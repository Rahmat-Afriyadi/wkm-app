const formProduk = [
  {
    title: "Nama Produk",
    name: "product_nama",
    id: "product_nama",
    disabled: true,
    type: "text",
  },
  {
    title: "Rate",
    name: "rate",
    id: "rate",
    disabled: true,
    step: "0.01",
    type: "number",
  },
  {
    title: "Biaya Admin",
    name: "admin",
    id: "admin",
    disabled: true,
    step: "0.01",
    type: "number",
  },
];

const formMotor = [
  {
    title: "Nama Motor",
    name: "nm_mtr",
    id: "nm_mtr",
    disabled: true,
    type: "text",
  },
  {
    title: "Tahun",
    name: "tahun",
    id: "tahun",
    disabled: true,
    type: "number",
  },
  {
    title: "On The Road",
    name: "otr",
    id: "otr",
    disabled: false,
    type: "number",
  },
  {
    title: "No Mesin",
    name: "no_msn",
    id: "no_msn",
    disabled: false,
    type: "text",
  },
  {
    title: "No Rangka",
    name: "no_rgk",
    id: "no_rgk",
    disabled: false,
    type: "text",
  },
  {
    title: "No Polisi",
    name: "no_plat",
    id: "no_plat",
    disabled: false,
    type: "text",
  },
];

const formKonsumen = [
  {
    title: "Nomor KTP",
    name: "nik",
    id: "nik",
    disabled: false,
    type: "text",
  },
  {
    title: "Nama STNK",
    name: "nm_konsumen",
    id: "nm_konsumen",
    disabled: false,
    type: "text",
  },
  {
    title: "Email",
    name: "email",
    id: "email",
    disabled: false,
    type: "email",
  },
  {
    title: "No HP",
    name: "no_hp",
    id: "no_hp",
    disabled: false,
    type: "text",
  },
  {
    title: "Alamat STNK",
    name: "alamat",
    id: "alamat",
    disabled: false,
    type: "text",
  },
  {
    title: "Tanggal Lahir",
    name: "tgl_lahir",
    id: "tgl_lahir",
    disabled: false,
    type: "date",
  },
];

const formKodepos = [
  {
    title: "Kelurahan",
    name: "kelurahan",
    id: "kelurahan",
    disabled: true,
    type: "text",
  },
  {
    title: "Kecamatan",
    name: "kecamatan",
    id: "kecamatan",
    disabled: true,
    type: "text",
  },
  {
    title: "Kota",
    name: "kota",
    id: "kota",
    disabled: true,
    type: "text",
  },
];

export { formProduk, formMotor, formKonsumen, formKodepos };
