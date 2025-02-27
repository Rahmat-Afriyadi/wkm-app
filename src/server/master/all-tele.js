// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";
import { masterAlasanTdkMembership } from "@/server/master/alasan_tdk_membership";
import { masterAktifJual } from "@/server/master/aktif-jual";
import { masterPendidikan } from "@/server/master/pendidikan";
import { masterAgama } from "@/server/master/agama";
import { masterKeluarBulan } from "@/server/master/keluar-bulan";
import { masterHobbies } from "@/server/master/hobbies";
import { masterTujuanPakai } from "@/server/master/tujuan-pakai";
import { masterKerja } from "@/server/master/kerja";
import { masterProdukAsuransi } from "@/server/master/produk-asuransi";
import { masterJenisKartu } from "@/server/master/jenis-kartu";
import { masterPromoTransfer } from "@/server/master/promo-transfer";
import { masterScript } from "@/server/master/script";

export const allTele = async () => {
  const [
    aktifJual,
    pendidikan,
    kodeKerja,
    agama,
    keluarBln,
    hobbies,
    tujuPak,
    produkAsuransiMtr,
    produkAsuransiPa,
    produkMembership,
    promoTransfer,
    scripts,
  ] = await Promise.all([
    masterAktifJual(),
    masterPendidikan(),
    masterAgama(),
    masterKeluarBulan(),
    masterHobbies(),
    masterTujuanPakai(),
    masterKerja(),
    masterProdukAsuransi(1),
    masterProdukAsuransi(2),
    masterJenisKartu(),
    masterPromoTransfer(),
    masterScript(),
  ]);
  return {
    aktifJual,
    pendidikan,
    kodeKerja,
    agama,
    keluarBln,
    hobbies,
    tujuPak,
    produkAsuransiMtr,
    produkAsuransiPa,
    produkMembership,
    promoTransfer,
    scripts,
  };
};
