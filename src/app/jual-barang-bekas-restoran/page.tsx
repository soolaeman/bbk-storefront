import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const SITE_URL = 'https://www.bukanbarukitchen.com';
const ITEMS_PER_PAGE = 9;

type Article = {
  id: number;
  title: string;
  href: string;
};

/*
 * DAFTAR ARTIKEL MANUAL
 *
 * Isi data di bawah ini dengan:
 * - title = judul H2 pertama dari halaman
 * - href  = URL halaman child
 *
 * Contoh:
 * {
 *   id: 1,
 *   title: 'Judul H2 halaman',
 *   href: '/jual-barang-bekas-restoran/jakarta/',
 * },
 *
 * Tidak ada lagi pengambilan data otomatis dari WordPress di halaman index ini.
 */
const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Solusi Praktis dan Hemat untuk Kebutuhan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/jakarta/',
  },
  {
    id: 2,
    title: 'Alternatif Cerdas: Peralatan Restoran Bekas yang Tetap Andal',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/',
  },
  {
    id: 3,
    title: 'Peralatan Profesional untuk Dapur Usaha Hemat dan Efisien',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/',
  },
  {
    id: 4,
    title: 'Peralatan Berkualitas untuk Dapur Usaha Hemat Anggaran',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/',
  },
  {
    id: 5,
    title: 'Pilihan Hemat: Peralatan Restoran Berkualitas Tanpa Harus Baru',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/',
  },
  {
    id: 6,
    title: 'Temukan Solusi Lengkap untuk Perlengkapan Restoran Tanpa Menguras Anggaran',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-utara/',
  },
  {
    id: 7,
    title: 'Cari Peralatan Dapur Profesional Tanpa Merogoh Kocek Dalam?',
    href: '/jual-barang-bekas-restoran/tangerang/',
  },
  {
    id: 8,
    title: 'Panorama Perlengkapan Bekas yang Menggerakkan Inovasi Kuliner',
    href: '/denyut-dapur-nusantara/',
  },
  {
    id: 9,
    title: 'Wujudkan Dapur Profesional dengan Biaya Terkontrol',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/',
  },
  {
    id: 10,
    title: 'Membidik Peluang di Reruntuhan Beton',
    href: '/denyut-dapur-nusantara/metropolis/',
  },
  {
    id: 11,
    title: 'Upgrade Dapur Anda Tanpa Menguras Anggaran',
    href: '/jual-barang-bekas-restoran/tangerang/tangsel/',
  },
  {
    id: 12,
    title: 'Kebutuhan Dapur Profesional Tak Harus Menguras Anggaran',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/',
  },
  {
    id: 13,
    title: 'Rancang Dapur Usaha Anda Tanpa Harus Memulai dari Nol',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-kota/',
  },
  {
    id: 14,
    title: 'Peralatan Dapur Usaha Andal dengan Harga Bersahabat',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/',
  },
  {
    id: 15,
    title: 'Saatnya Tingkatkan Efisiensi Dapur Tanpa Menguras Anggaran',
    href: '/jual-barang-bekas-restoran/bogor/',
  },
  {
    id: 16,
    title: 'Gunakan Peralatan Profesional Bekas Tanpa Kalah Kualitas',
    href: '/jual-barang-bekas-restoran/bogor/kota-bogor/',
  },
  {
    id: 17,
    title: 'Peralatan Dapur Efisien Tanpa Harus Beli Baru',
    href: '/jual-barang-bekas-restoran/bogor/bogor-kota/',
  },
  {
    id: 18,
    title: 'Saat modal terbatas, dapur profesional tetap butuh peralatan andal',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/',
  },
  {
    id: 19,
    title: 'Peralatan Dapur Profesional Siap Pakai dengan Harga Terjangkau',
    href: '/jual-barang-bekas-restoran/bekasi/',
  },
  {
    id: 20,
    title: 'Bangun Dapur Andal Tanpa Menguras Modal',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/',
  },
  {
    id: 21,
    title: 'Solusi Instan untuk Bangun Dapur Usaha Tanpa Repot',
    href: '/jual-barang-bekas-restoran/bekasi/bekasi-kota/',
  },
  {
    id: 22,
    title: 'Upgrade Dapur Usaha Tanpa Tekanan Anggaran',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/',
  },
  {
    id: 23,
    title: 'Kebijakan Privasi',
    href: '/kebijakan-privasi-dan-penggunaan/',
  },
  {
    id: 24,
    title: 'Solusi Peralatan Dapur Profesional Tak Harus Dimulai dari Barang Baru',
    href: '/jual-barang-bekas-restoran/depok/',
  },
  {
    id: 25,
    title: 'Dapur Usaha Siap Jalan Tanpa Perlu Mulai dari Awal',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/',
  },
  {
    id: 26,
    title: 'Upgrade Dapur Usaha Tanpa Harus Merogoh Modal Terlalu Dalam',
    href: '/jual-barang-bekas-restoran/depok/depok-kota/',
  },
  {
    id: 27,
    title: 'Solusi Praktis bagi Pemilik Usaha Kuliner yang Ingin Hemat Tanpa Kompromi Kualitas',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/gambir/',
  },
  {
    id: 28,
    title: 'Peralatan Usaha Hemat Tanpa Mengorbankan Kualitas',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/tanah-abang/',
  },
  {
    id: 29,
    title: 'Solusi Usaha Kuliner dengan Anggaran Ringan',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/menteng/',
  },
  {
    id: 30,
    title: 'Solusi Terjangkau untuk Kebutuhan Peralatan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/johar-baru/',
  },
  {
    id: 31,
    title: 'Solusi Praktis untuk Usaha Kuliner yang Ingin Tumbuh Tanpa Harus Menguras Modal',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/cempaka-putih/',
  },
  {
    id: 32,
    title: 'Peralatan Dapur Usaha Tak Harus Mahal, Asal Tahu Cara Pintarnya',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/kemayoran/',
  },
  {
    id: 33,
    title: 'Hemat Modal Usaha Kuliner Tanpa Mengorbankan Kualitas',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/senen/',
  },
  {
    id: 34,
    title: 'Bangun Dapur Usaha Lebih Cepat dengan Biaya Minim',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-pusat/sawah-besar/',
  },
  {
    id: 35,
    title: 'Peralatan Lengkap untuk Memulai Bisnis Kuliner Lebih Cepat',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/cengkareng/',
  },
  {
    id: 36,
    title: 'Solusi Peralatan Dapur Usaha Profesional yang Terjangkau dan Siap Kirim',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/grogol-petamburan/',
  },
  {
    id: 37,
    title: 'Peluang Usaha Kuliner Kini Bisa Dimulai dengan Dana Terbatas',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/kalideres/',
  },
  {
    id: 38,
    title: 'Dapur Andal untuk Bisnis Kuliner Berkembang Pesat',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/kebon-jeruk/',
  },
  {
    id: 39,
    title: 'Ketika Kebutuhan Usaha Kuliner Tak Bisa Tunggu Modal Besar',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/kembangan/',
  },
  {
    id: 40,
    title: 'Solusi Ekonomis bagi Pebisnis Kuliner yang Ingin Cepat Ekspansi',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/palmerah/',
  },
  {
    id: 41,
    title: 'Solusi Peralatan Dapur Profesional yang Ramah Anggaran',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/taman-sari/',
  },
  {
    id: 42,
    title: 'Bangun Dapur Usaha Anda Tanpa Harus Dimulai dari Nol',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-barat/tambora/',
  },
  {
    id: 43,
    title: 'Wujudkan Bisnis Kuliner Anda Tanpa Beban Biaya Besar',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/cilandak/',
  },
  {
    id: 44,
    title: 'Solusi Cerdas untuk Anda yang Ingin Hemat Modal Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/jagakarsa/',
  },
  {
    id: 45,
    title: 'Dapur Berkualitas Kini Bisa Dimiliki dengan Budget Terbatas',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/kebayoran-baru/',
  },
  {
    id: 46,
    title: 'Optimalkan Dapur Profesional Meski Modal Terbatas',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/kebayoran-lama/',
  },
  {
    id: 47,
    title: 'Peralatan Usaha Terjangkau untuk Awal Bisnis yang Efisien',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/mampang-prapatan/',
  },
  {
    id: 48,
    title: 'Bangun Dapur Usaha Tanpa Harus Menunda Karena Modal',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/pancoran/',
  },
  {
    id: 49,
    title: 'Mulai Usaha Kuliner Hemat dengan Investasi Rendah',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/pasar-minggu/',
  },
  {
    id: 50,
    title: 'Solusi Peralatan Andal untuk Bisnis Kuliner Berbiaya Efisien',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/setiabudi/',
  },
  {
    id: 51,
    title: 'Mulai Usaha Kuliner dengan Solusi Dapur yang Sudah Siap Pakai',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-selatan/tebet/',
  },
  {
    id: 52,
    title: 'Ketika Kebutuhan Dapur Usaha Tidak Bisa Menunggu Modal Besar',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/cakung/',
  },
  {
    id: 53,
    title: 'Solusi Realistis untuk Perlengkapan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/ciracas/',
  },
  {
    id: 54,
    title: 'Peralatan Dapur Usaha Tak Harus Baru untuk Tetap Profesional',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/cipayung/',
  },
  {
    id: 55,
    title: 'Peralatan Dapur Usaha yang Terjangkau dan Siap Pakai',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/duren-sawit/',
  },
  {
    id: 56,
    title: 'Efisiensi Biaya Dapur Usaha Bisa Dimulai dari Pilihan yang Lebih Bijak',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/jatinegara/',
  },
  {
    id: 57,
    title: 'Perlengkapan Dapur Usaha Tidak Harus Mahal untuk Tetap Profesional',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/kramat-jati/',
  },
  {
    id: 58,
    title: 'Peralatan Dapur Profesional Tak Harus Selalu Baru',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/kampung-makassar/',
  },
  {
    id: 59,
    title: 'Efisiensi Dapur Usaha Tak Selalu Butuh yang Serba Baru',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/matraman/',
  },
  {
    id: 60,
    title: 'Peralatan Dapur Bekas: Solusi Praktis untuk Menjalankan Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/pasar-rebo/',
  },
  {
    id: 61,
    title: 'Perlengkapan Dapur Bekas Bisa Jadi Solusi Efisien untuk Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-timur/pulo-gadung/',
  },
  {
    id: 62,
    title: 'Kebutuhan Dapur Usaha Tak Selalu Harus Dimulai dari Nol',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-utara/cilincing/',
  },
  {
    id: 63,
    title: 'Mengapa Banyak Usaha Kuliner Memilih Peralatan Dapur Bekas?',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-utara/kelapa-gading/',
  },
  {
    id: 64,
    title: 'Mengelola Dapur Usaha dengan Anggaran Efisien dan Hasil Maksimal',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-utara/koja/',
  },
  {
    id: 65,
    title: 'Solusi Efisien untuk Menyiapkan Dapur Usaha yang Siap Pakai',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-utara/pademangan/',
  },
  {
    id: 66,
    title: 'Peralatan Dapur Profesional Bisa Didapatkan Tanpa Harus Selalu Baru',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-utara/penjaringan/',
  },
  {
    id: 67,
    title: 'Solusi Realistis untuk Menyempurnakan Dapur Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/jakarta/jakarta-utara/tanjung-priok/',
  },
  {
    id: 68,
    title: 'Menjawab Kebutuhan Dapur Usaha dengan Solusi Profesional yang Terjangkau',
    href: '/jual-barang-bekas-restoran/bogor/kota-bogor/bogor-barat/',
  },
  {
    id: 69,
    title: 'Mendukung Dapur Usaha Profesional dengan Solusi yang Lebih Realistis',
    href: '/jual-barang-bekas-restoran/bogor/bogor-selatan/',
  },
  {
    id: 70,
    title: 'Solusi Peralatan Usaha Kuliner yang Tetap Andal Meski Bukan Baru',
    href: '/jual-barang-bekas-restoran/bogor/kota-bogor/bogor-tengah/',
  },
  {
    id: 71,
    title: 'Peralatan Dapur Bekas Bisa Jadi Langkah Cerdas untuk Efisiensi Usaha',
    href: '/jual-barang-bekas-restoran/bogor/kota-bogor/bogor-timur/',
  },
  {
    id: 72,
    title: 'Kebutuhan Peralatan Dapur Usaha Tak Pernah Sederhana',
    href: '/jual-barang-bekas-restoran/bogor/kota-bogor/bogor-utara/',
  },
  {
    id: 73,
    title: 'Mengembangkan Dapur Usaha Tanpa Harus Membeli Semua Serba Baru',
    href: '/jual-barang-bekas-restoran/bogor/kota-bogor/tanah-sareal/',
  },
  {
    id: 74,
    title: 'Peralatan Dapur Bekas: Solusi Nyata bagi Usaha Kuliner yang Ingin Tumbuh',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/beji/',
  },
  {
    id: 75,
    title: 'Kebutuhan Peralatan Dapur Usaha yang Kian Mendesak',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/bojongsari/',
  },
  {
    id: 76,
    title: 'Memaksimalkan Potensi Usaha Kuliner dengan Peralatan Dapur Bekas Layak Pakai',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/cilodong/',
  },
  {
    id: 77,
    title: 'Kebutuhan Peralatan Dapur Usaha Tak Pernah Sederhana',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/cimanggis/',
  },
  {
    id: 78,
    title: 'Merancang Dapur Usaha dengan Strategi yang Tepat',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/cinere/',
  },
  {
    id: 79,
    title: 'Wujudkan Dapur Usaha Efisien dengan Peralatan Bekas Terpilih',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/cipayung/',
  },
  {
    id: 80,
    title: 'Solusi Peralatan Dapur Usaha Saat Modal Terbatas',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/limo/',
  },
  {
    id: 81,
    title: 'Solusi Hemat dan Profesional untuk Perlengkapan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/pancoran-mas/',
  },
  {
    id: 82,
    title: 'Solusi Praktis Perlengkapan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/sawangan/',
  },
  {
    id: 83,
    title: 'Solusi Perlengkapan Dapur Usaha yang Efisien dan Andal',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/sukmajaya/',
  },
  {
    id: 84,
    title: 'Kebutuhan Usaha Kuliner Tak Harus Selalu Baru',
    href: '/jual-barang-bekas-restoran/depok/kota-depok/tapos/',
  },
  {
    id: 85,
    title: 'Solusi Praktis bagi Usaha Kuliner Anda yang Ingin Lebih Hemat',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/ciputat/',
  },
  {
    id: 86,
    title: 'Solusi Pintar untuk Peralatan Dapur Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/ciputat-timur/',
  },
  {
    id: 87,
    title: 'Peralatan Dapur Bekas Bisa Jadi Solusi Pintar bagi Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/pamulang/',
  },
  {
    id: 88,
    title: 'Solusi Cerdas Bagi Pemilik Usaha Kuliner dengan Budget Terbatas',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/pondok-aren/',
  },
  {
    id: 89,
    title: 'Solusi Hemat untuk Perlengkapan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/serpong/',
  },
  {
    id: 90,
    title: 'Solusi Cerdas untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/serpong-utara/',
  },
  {
    id: 91,
    title: 'Ketika Pelaku Usaha Kuliner Membutuhkan Solusi Perlengkapan Dapur yang Efisien',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/setu/',
  },
  {
    id: 92,
    title: 'Tantangan Modal dan Kebutuhan Alat di Dunia Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/bsd/',
  },
  {
    id: 93,
    title: 'Solusi Cerdas untuk Memenuhi Kebutuhan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/bintaro/',
  },
  {
    id: 94,
    title: 'Solusi Ekonomis untuk Perlengkapan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/tangerang/tangerang-selatan/gading-serpong/',
  },
  {
    id: 95,
    title: 'Perlengkapan Dapur Bekas yang Masih Layak Pakai dan Siap Dikirim',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/batuceper/',
  },
  {
    id: 96,
    title: 'Kebutuhan Usaha Kuliner Anda Tak Perlu Mahal',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/jual-barang-bekas-restoran-di-benda/',
  },
  {
    id: 97,
    title: 'Solusi Praktis untuk Kebutuhan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/cibodas/',
  },
  {
    id: 98,
    title: 'Solusi Tepat untuk Kebutuhan Peralatan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/ciledug/',
  },
  {
    id: 99,
    title: 'Peralatan Dapur Bekas Berkualitas Tak Harus Sulit Dicari',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/cipondoh/',
  },
  {
    id: 100,
    title: 'Kebutuhan Usaha Kuliner yang Kian Meningkat',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/jatiuwung/',
  },
  {
    id: 101,
    title: 'Perlengkapan Dapur Bekas: Solusi Praktis dan Ekonomis',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/karang-tengah/',
  },
  {
    id: 102,
    title: 'Solusi Peralatan Dapur Andal untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/karawaci/',
  },
  {
    id: 103,
    title: 'Peralatan Dapur Bekas yang Tetap Andal untuk Kebutuhan Usaha Anda',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/larangan/',
  },
  {
    id: 104,
    title: 'Solusi Peralatan Dapur Usaha yang Terjangkau dan Andal',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/neglasari/',
  },
  {
    id: 105,
    title: 'Solusi Peralatan Dapur Bekas Berkualitas untuk Semua Skala Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/periuk/',
  },
  {
    id: 106,
    title: 'Solusi Tepat Bagi Anda yang Ingin Menghemat Modal Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/tangerang/kota-tangerang/di-pinang/',
  },
  {
    id: 107,
    title: 'Kebutuhan Usaha Kuliner Butuh Solusi Praktis dan Ekonomis',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/bekasi-barat/',
  },
  {
    id: 108,
    title: 'Solusi Hemat untuk Kebutuhan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/bekasi-selatan/',
  },
  {
    id: 109,
    title: 'Solusi Pintar untuk Kebutuhan Peralatan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/bekasi-timur/',
  },
  {
    id: 110,
    title: 'Solusi Cerdas untuk Memulai Usaha Kuliner Tanpa Overbudget',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/bekasi-utara/',
  },
  {
    id: 111,
    title: 'Solusi Pintar untuk Peralatan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/bantar-gebang/',
  },
  {
    id: 112,
    title: 'Solusi Tepat untuk Kebutuhan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/jatiasih/',
  },
  {
    id: 113,
    title: 'Solusi Pintar bagi Usaha Kuliner yang Ingin Hemat Tanpa Kompromi Kualitas',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/jatisampurna/',
  },
  {
    id: 114,
    title: 'Solusi Praktis Perlengkapan Dapur untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/medan-satria/',
  },
  {
    id: 115,
    title: 'Solusi Cerdas untuk Kebutuhan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/mustika-jaya/',
  },
  {
    id: 116,
    title: 'Wujudkan Dapur Usaha Tanpa Harus Merogoh Kocek Dalam',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/pondok-gede/',
  },
  {
    id: 117,
    title: 'Solusi Dapur Usaha yang Cerdas dan Terjangkau',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/pondok-melati/',
  },
  {
    id: 118,
    title: 'Solusi Cerdas untuk Perlengkapan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kota-bekasi/rawalumbu/',
  },
  {
    id: 119,
    title: 'Solusi Perlengkapan Dapur yang Siap Pakai dan Hemat Biaya',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/balaraja/',
  },
  {
    id: 120,
    title: 'Solusi Perlengkapan Dapur yang Hemat dan Siap Pakai',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/cikupa/',
  },
  {
    id: 121,
    title: 'Solusi Efisien untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/cisauk/',
  },
  {
    id: 122,
    title: 'Solusi Praktis untuk Kebutuhan Dapur Usaha',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/cisoka/',
  },
  {
    id: 123,
    title: 'Peralatan Dapur Usaha Berkualitas Tanpa Bikin Kantong Bolong',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/curug/',
  },
  {
    id: 124,
    title: 'Cara Efisien Memenuhi Kebutuhan Dapur Bisnis Kuliner',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/gunung-kaler/',
  },
  {
    id: 125,
    title: 'Peralatan Dapur Usaha Berkualitas Tanpa Menguras Modal Awal',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/jambe/',
  },
  {
    id: 126,
    title: 'Cara Cerdas Menekan Biaya Dapur Usaha Tanpa Kompromi',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/jayanti/',
  },
  {
    id: 127,
    title: 'Strategi Efisien Menyiapkan Dapur Usaha Tanpa Boros',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/kelapa-dua/',
  },
  {
    id: 128,
    title: 'Solusi Dapur Usaha yang Efisien dan Siap Pakai',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/kemiri/',
  },
  {
    id: 129,
    title: 'Solusi Realistis untuk Menyusun Dapur Usaha yang Andal',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/kosambi/',
  },
  {
    id: 130,
    title: 'Kunci Memulai Usaha Kuliner Tanpa Terjebak Biaya Awal yang Mencekik',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/kresek/',
  },
  {
    id: 131,
    title: 'Langkah Bijak Membangun Dapur Usaha Tanpa Menguras Modal',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/kronjo/',
  },
  {
    id: 132,
    title: 'Solusi Realistis untuk Dapur Usaha Tanpa Biaya Berlebihan',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/legok/',
  },
  {
    id: 133,
    title: 'Langkah Cerdas Menyiapkan Dapur untuk Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/mauk/',
  },
  {
    id: 134,
    title: 'Waktu Terbaik untuk Mulai Hemat di Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/mekar-baru/',
  },
  {
    id: 135,
    title: 'Optimalkan Modal Usaha Kuliner dengan Strategi Pintar',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/pagedangan/',
  },
  {
    id: 136,
    title: 'Memaksimalkan Potensi Usaha dengan Peralatan Dapur Stainless Bekas Berkualitas',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/panongan/',
  },
  {
    id: 137,
    title: 'Memahami Kebutuhan Dapur Usaha yang Efisien',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/pakuhaji/',
  },
  {
    id: 138,
    title: 'Menemukan Titik Awal Tepat untuk Dapur Usaha',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/pasar-kemis/',
  },
  {
    id: 139,
    title: 'Memulai dengan Pilihan Peralatan Dapur yang Tepat',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/rajeg/',
  },
  {
    id: 140,
    title: 'Rahasia Efisiensi dalam Menata Dapur Usaha',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/sepatan/',
  },
  {
    id: 141,
    title: 'Mengapa Banyak Usaha Kuliner Memilih Peralatan Dapur Bekas Berkualitas?',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/sepatan-timur/',
  },
  {
    id: 142,
    title: 'Strategi Cerdas Mewujudkan Dapur Usaha Hemat dan Efektif',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/sindang-jaya/',
  },
  {
    id: 143,
    title: 'Langkah Cerdas Mengoptimalkan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/solear/',
  },
  {
    id: 144,
    title: 'Solusi Pintar untuk Memaksimalkan Perlengkapan Dapur Usaha',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/sukadiri/',
  },
  {
    id: 145,
    title: 'Solusi Tepat untuk Dapur Usaha yang Ingin Tetap Kompetitif',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/sukamulya/',
  },
  {
    id: 146,
    title: 'Solusi Hemat dan Profesional untuk Kebutuhan Dapur Usaha',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/teluknaga/',
  },
  {
    id: 147,
    title: 'Memulai dari Kebutuhan Nyata Dapur Usaha',
    href: '/jual-barang-bekas-restoran/tangerang/kab-tangerang/tigaraksa/',
  },
  {
    id: 148,
    title: 'Peralatan Dapur Bekas Berkualitas untuk Mulai dan Scale Up dengan Aman',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/babelan/',
  },
  {
    id: 149,
    title: 'Solusi Hemat untuk Kebutuhan Peralatan Dapur Usaha',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/bojongmangu/',
  },
  {
    id: 150,
    title: 'Cara Hemat Memenuhi Kebutuhan Peralatan Dapur Restoran',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/cabangbungin/',
  },
  {
    id: 151,
    title: 'Memulai Usaha Kuliner Tanpa Harus Boros',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/cibarusah/',
  },
  {
    id: 152,
    title: 'Solusi Tepat untuk Perlengkapan Dapur Berkualitas',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/cibitung/',
  },
  {
    id: 153,
    title: 'Solusi Tepat Modal Hemat: Pilihan Peralatan Restoran Bekas Layak Pakai',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/cikarang-barat/',
  },
  {
    id: 154,
    title: 'Solusi Hemat untuk Dapur Usaha yang Siap Operasi',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/cikarang-pusat/',
  },
  {
    id: 155,
    title: 'Solusi Tepat untuk Usaha Kuliner dengan Modal Hemat',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/cikarang-selatan/',
  },
  {
    id: 156,
    title: 'Rahasia Menghemat Modal Usaha Kuliner dengan Barang Dapur Restoran Bekas',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/cikarang-timur/',
  },
  {
    id: 157,
    title: 'Solusi Andal untuk Peralatan Dapur Bekas Berkualitas',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/cikarang-utara/',
  },
  {
    id: 158,
    title: 'Solusi Hemat untuk Perlengkapan Dapur Berkualitas',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/karangbahagia/',
  },
  {
    id: 159,
    title: 'Solusi Hemat untuk Naikkan Performa Dapur Usaha',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/kedungwaringin/',
  },
  {
    id: 160,
    title: 'Solusi Hemat untuk Perlengkapan Dapur Berkualitas',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/muara-gembong/',
  },
  {
    id: 161,
    title: 'Solusi Hemat untuk Dapur Usaha yang Serius',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/pebayuran/',
  },
  {
    id: 162,
    title: 'Solusi Hemat yang Tetap Terlihat Profesional',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/serang-baru/',
  },
  {
    id: 163,
    title: 'Saat Modal Harus Efisien, Dapur Tetap Wajib Siap Kerja',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/setu-bekasi/',
  },
  {
    id: 164,
    title: 'Solusi Cerdas untuk Peralatan Dapur Berkualitas',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/sukakarya/',
  },
  {
    id: 165,
    title: 'Peralatan Dapur Bekas Berkualitas untuk Skala Usaha yang Serius',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/sukawangi/',
  },
  {
    id: 166,
    title: 'Langkah Cerdas Memenuhi Kebutuhan Dapur Usaha',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/tambelang/',
  },
  {
    id: 167,
    title: 'Solusi Cerdas untuk Menemukan Peralatan Dapur Berkualitas Tanpa Harus Beli Baru',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/tambun-selatan/',
  },
  {
    id: 168,
    title: 'Solusi Tepat untuk Usaha Kuliner dengan Anggaran Efisien',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/tambun-utara/',
  },
  {
    id: 169,
    title: 'Solusi Peralatan Dapur Berkualitas untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/tarumajaya/',
  },
  {
    id: 170,
    title: 'Solusi Hemat untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bekasi/kabupaten-bekasi/tambak/',
  },
  {
    id: 171,
    title: 'Solusi Peralatan Dapur Berkualitas dengan Harga Lebih Terjangkau',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/babakan-madang/',
  },
  {
    id: 172,
    title: 'Rahasia Dapur Efisien Tanpa Biaya Membengkak',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/bojonggede/',
  },
  {
    id: 173,
    title: 'Rahasia Pintar Hemat Biaya Peralatan Dapur Usaha',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/caringin/',
  },
  {
    id: 174,
    title: 'Strategi Pintar Mendapatkan Peralatan Dapur Berkualitas',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/cariu/',
  },
  {
    id: 175,
    title: 'Langkah Praktis Wujudkan Dapur Profesional dengan Budget Terjangkau',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/ciampea/',
  },
  {
    id: 176,
    title: 'Strategi Jitu Mendukung Dapur Usaha Lebih Efisien',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/cibinong/',
  },
  {
    id: 177,
    title: 'Trik Hemat Bangun Usaha Kuliner Tanpa Bebani Anggaran',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/cibungbulang/',
  },
  {
    id: 178,
    title: 'Solusi Hemat untuk Peralatan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/cigombong/',
  },
  {
    id: 179,
    title: 'Rahasia Cerdas Dapur Hemat untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/cigudeg/',
  },
  {
    id: 180,
    title: 'Strategi Tepat Menghemat Biaya Peralatan Restoran',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/cijeruk/',
  },
  {
    id: 181,
    title: 'Cara Efektif Wujudkan Dapur Usaha Lengkap Tanpa Boros Modal',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/cileungsi/',
  },
  {
    id: 182,
    title: 'Pilihan Bijak untuk Memulai atau Mengembangkan Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/ciomas/',
  },
  {
    id: 183,
    title: 'Kunci Efisiensi Dapur Usaha: Berkualitas, Hemat, Siap Pakai',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/cisarua/',
  },
  {
    id: 184,
    title: 'Solusi Praktis untuk Peralatan Dapur Usaha',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/ciseeng/',
  },
  {
    id: 185,
    title: 'Solusi Hemat untuk Kebutuhan Peralatan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/citereup/',
  },
  {
    id: 186,
    title: 'Solusi Peralatan Dapur Usaha Berkualitas dengan Harga Bersahabat',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/dramaga/',
  },
  {
    id: 187,
    title: 'Menghadirkan Solusi Hemat untuk Usaha Kuliner',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/gunung-putri/',
  },
  {
    id: 188,
    title: 'Solusi Cerdas untuk Melengkapi Dapur Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/gunung-sindur/',
  },
  {
    id: 189,
    title: 'Solusi Cerdas untuk Kebutuhan Peralatan Dapur Bekas Berkualitas',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/jasinga/',
  },
  {
    id: 190,
    title: 'Strategi Jitu Membangun Dapur Profesional dengan Perlengkapan Bekas Berkualitas',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/jonggol/',
  },
  {
    id: 191,
    title: 'Rahasia Sukses Membangun Dapur Restoran dengan Anggaran Terjangkau',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/kemang/',
  },
  {
    id: 192,
    title: 'Solusi Cerdas untuk Perlengkapan Dapur Profesional',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/klapanunggal/',
  },
  {
    id: 193,
    title: 'Peralatan Dapur Bekas, Solusi Hemat untuk Usaha Kuliner yang Tetap Profesional',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/leuwiliang/',
  },
  {
    id: 194,
    title: 'Cara Cerdas Menyiapkan Dapur Usaha Tanpa Harus Beli Baru',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/leuwisadeng/',
  },
  {
    id: 195,
    title: 'Solusi Hemat untuk Usaha Kuliner Berkembang',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/megamendung/',
  },
  {
    id: 196,
    title: 'Peralatan Dapur Bekas yang Layak Pakai untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/nanggung/',
  },
  {
    id: 197,
    title: 'Solusi Lengkap untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/pamijahan/',
  },
  {
    id: 198,
    title: 'Solusi Hemat untuk Peralatan Dapur Restoran Berkualitas',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/parung/',
  },
  {
    id: 199,
    title: 'Solusi Hemat dan Cerdas untuk Kebutuhan Peralatan Dapur Usaha',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/parung-panjang/',
  },
  {
    id: 200,
    title: 'Langkah Cerdas Mewujudkan Dapur Usaha Profesional dengan Anggaran Terjangkau',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/ranca-bungur/',
  },
  {
    id: 201,
    title: 'Peralatan Dapur Bekas Berkualitas untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/rumpin/',
  },
  {
    id: 202,
    title: 'Cara Hemat Membangun Dapur Profesional dengan Barang Bekas Layak Pakai',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/sukajaya/',
  },
  {
    id: 203,
    title: 'Peralatan Dapur Bekas Berkualitas untuk Usaha yang Ingin Tumbuh Tanpa Boros Modal',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/sukamakmur/',
  },
  {
    id: 204,
    title: 'Pilihan Cerdas untuk Memulai Usaha Kuliner Hemat Biaya',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/sukaraja/',
  },
  {
    id: 205,
    title: 'Peralatan Dapur Bekas Berkualitas untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/tajurhalang/',
  },
  {
    id: 206,
    title: 'Solusi Cerdas untuk Kebutuhan Peralatan Dapur Usaha Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/tanjungsari/',
  },
  {
    id: 207,
    title: 'Peralatan Dapur Bekas Layak Pakai untuk Usaha Kuliner Anda',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/tenjo/',
  },
  {
    id: 208,
    title: 'Bangkitkan Dapur Usaha Tanpa Harus Mulai dari Nol',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/tenjolaya/',
  },
  {
    id: 209,
    title: 'Solusi Hemat dan Profesional untuk Kebutuhan Peralatan Dapur Restoran',
    href: '/jual-barang-bekas-restoran/bogor/kab-bogor/tamansari/',
  },
  {
    id: 210,
    title: 'Mewujudkan Dapur Efisien untuk Program Gizi Nasional',
    href: '/solusi-peralatan-dapur-mbg/',
  },
  {
    id: 211,
    title: 'Transformasi Dapur Menuju Layanan Gizi yang Andal dan Efisien',
    href: '/solusi-peralatan-dapur-mbg/jakarta/',
  },
  {
    id: 212,
    title: 'Optimalkan Operasional Dapur untuk Akselerasi Program Gizi Nasional',
    href: '/solusi-peralatan-dapur-mbg/jawa-barat/',
  },
  {
    id: 213,
    title: 'Menyiapkan Dapur Hebat untuk Misi Sosial Bergizi',
    href: '/solusi-peralatan-dapur-mbg/jawa-timur/',
  },
  {
    id: 214,
    title: 'Revolusi Infrastruktur Dapur: Efisiensi Program Gizi Nasional di Jawa Tengah',
    href: '/solusi-peralatan-dapur-mbg/jawa-tengah/',
  },
  {
    id: 215,
    title: 'Dari Dapur Aman ke Dapur Efisien: Kunci Sukses Program Makan Bergizi',
    href: '/solusi-peralatan-dapur-mbg/banten/',
  },
  {
    id: 216,
    title: 'Mengoptimalkan Dapur Bergizi: Fondasi Sukses Program Nasional',
    href: '/solusi-peralatan-dapur-mbg/bali/',
  },
  {
    id: 217,
    title: 'Infrastruktur Dapur yang Tangguh: Pilar Kesuksesan Program Gizi Nasional',
    href: '/solusi-peralatan-dapur-mbg/sumatera-utara/',
  },
  {
    id: 218,
    title: 'Mewujudkan Dapur Efisien untuk Generasi Emas',
    href: '/solusi-peralatan-dapur-mbg/sulawesi-selatan/',
  },
  {
    id: 219,
    title: 'Transformasi Dapur Bergizi: Menjawab Tantangan Operasional',
    href: '/solusi-peralatan-dapur-mbg/riau/',
  },
  {
    id: 220,
    title: 'Dari Dapur Bersih ke Dapur Efisien: Kunci Sukses Program MBG',
    href: '/solusi-peralatan-dapur-mbg/kepulauan-riau/',
  },
  {
    id: 221,
    title: 'Dapur Efisien untuk Program Gizi yang Berkelanjutan',
    href: '/solusi-peralatan-dapur-mbg/kalimantan-timur/',
  },
  {
    id: 222,
    title: 'Bangun Dapur Efisien untuk Dukung Program Gizi Nasional',
    href: '/solusi-peralatan-dapur-mbg/sumatera-selatan/',
  },
  {
    id: 223,
    title: 'Dukungan Nyata untuk Generasi Sehat Lampung',
    href: '/solusi-peralatan-dapur-mbg/lampung/',
  },
  {
    id: 224,
    title: 'Optimalkan Operasional Dapur MBG dengan Perlengkapan yang Tepat',
    href: '/solusi-peralatan-dapur-mbg/yogyakarta/',
  },
  {
    id: 225,
    title: 'Mewujudkan Dapur Andal untuk Generasi Sehat yang Berprestasi',
    href: '/solusi-peralatan-dapur-mbg/aceh/',
  },
  {
    id: 226,
    title: 'Infrastruktur yang Tepat: Kunci Keberhasilan Program Gizi Berskala Nasional',
    href: '/solusi-peralatan-dapur-mbg/nusa-tenggara-barat/',
  },
  {
    id: 227,
    title: 'Membangun Dapur Andal untuk Program Gizi Daerah',
    href: '/solusi-peralatan-dapur-mbg/kalimantan-selatan/',
  },
  {
    id: 228,
    title: 'Strategi Investasi Infrastruktur Dapur untuk Program MBG yang Berkelanjutan',
    href: '/solusi-peralatan-dapur-mbg/jambi/',
  },
  {
    id: 229,
    title: 'Transformasi Dapur Komunal: Dari Konsep ke Realisasi Operasional MBG',
    href: '/solusi-peralatan-dapur-mbg/sumatera-barat/',
  },
  {
    id: 230,
    title: 'Membangun Rantai Nilai Pangan yang Efektif Melalui Dapur MBG Andal',
    href: '/solusi-peralatan-dapur-mbg/sulawesi-utara/',
  },
  {
    id: 231,
    title: 'Merancang Dapur Operasional yang Mendukung Skala dan Higienitas Program MBG',
    href: '/solusi-peralatan-dapur-mbg/ibu-kota-nusantara/',
  },
  {
    id: 232,
    title: 'Menyiapkan Dapur Strategis untuk Akselerasi Gizi Nasional',
    href: '/solusi-peralatan-dapur-mbg/kalimantan-barat/',
  },
  {
    id: 233,
    title: 'Membangun Dapur Andal sebagai Fondasi Layanan Gizi Berkelanjutan',
    href: '/solusi-peralatan-dapur-mbg/kalimantan-tengah/',
  },
  {
    id: 234,
    title: 'Memperkuat Kapasitas Dapur untuk Mendukung Kinerja Lembaga Gizi',
    href: '/solusi-peralatan-dapur-mbg/sulawesi-tengah/',
  },
  {
    id: 235,
    title: 'Transformasi Dapur SPPG: Pilar Penting Sukses Program Makan Bergizi',
    href: '/solusi-peralatan-dapur-mbg/nusa-tenggara-timur/',
  },
];

export const metadata: Metadata = {
  title: 'Jual Barang Bekas Restoran',
  description:
    'Temukan panduan, solusi, dan informasi seputar peralatan restoran bekas yang dikurasi dari halaman BBKitchen.',
  alternates: {
    canonical: `${SITE_URL}/jual-barang-bekas-restoran/`,
  },
};

function pageNumbers(current: number, total: number) {
  const pages = new Set<number>([1, total, current]);

  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);
  if (current > 2) pages.add(2);
  if (current < total - 1) pages.add(total - 1);

  return [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
}

export default async function JualBarangBekasRestoranPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string | string[] }>;
}) {
  const params = searchParams ? await searchParams : {};
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const requestedPage = Number.parseInt(rawPage ?? '1', 10);

  const totalPages = Math.max(1, Math.ceil(ARTICLES.length / ITEMS_PER_PAGE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleArticles = ARTICLES.slice(start, start + ITEMS_PER_PAGE);
  const numbers = pageNumbers(currentPage, totalPages);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />

      <main>
        <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 overflow-x-auto text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="inline-flex min-w-max items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-600">
              <Link href="/" className="font-medium hover:text-slate-950">
                Home
              </Link>
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
              <span aria-current="page" className="font-semibold text-slate-900">
                Jual Barang Bekas Restoran
              </span>
            </div>
          </nav>

          <header className="mb-10 border-b border-slate-200 pb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-amber-600">
              Artikel &amp; Tips
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Jual Barang Bekas Restoran
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              Temukan panduan, solusi, dan informasi seputar peralatan restoran
              bekas yang dikurasi dari halaman BBKitchen.
            </p>
          </header>

          <section aria-labelledby="article-index-title">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2
                  id="article-index-title"
                  className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
                >
                  Artikel &amp; Tips
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Temukan berbagai artikel pilihan tentang peralatan dapur, usaha kuliner, dan solusi praktis untuk kebutuhan restoran. 
                  Jelajahi panduan dan informasi yang relevan untuk membantu Anda memilih peralatan dan mengembangkan kebutuhan usaha dengan lebih tepat.
                </p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 sm:inline-flex">
                {ARTICLES.length} artikel
              </span>
            </div>

            {visibleArticles.length > 0 ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleArticles.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-black leading-snug text-slate-950 group-hover:text-emerald-700">
                          {item.title}
                        </h3>
                        <span className="shrink-0 text-sm font-bold text-emerald-700">
                          Baca →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav
                    aria-label="Pagination artikel"
                    className="mt-10 flex flex-wrap items-center justify-center gap-2"
                  >
                    {currentPage > 1 ? (
                      <Link
                        href={currentPage === 2 ? '?' : `?page=${currentPage - 1}`}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
                      >
                        ← Sebelumnya
                      </Link>
                    ) : (
                      <span className="rounded-xl border border-slate-100 px-4 py-2 text-sm font-bold text-slate-300">
                        ← Sebelumnya
                      </span>
                    )}

                    {numbers.map((number, index) => {
                      const previous = numbers[index - 1];
                      const needsGap = previous !== undefined && number - previous > 1;

                      return (
                        <span key={number} className="contents">
                          {needsGap && (
                            <span className="px-1 text-slate-400" aria-hidden="true">
                              …
                            </span>
                          )}
                          <Link
                            href={number === 1 ? '?' : `?page=${number}`}
                            aria-current={number === currentPage ? 'page' : undefined}
                            className={
                              number === currentPage
                                ? 'rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white'
                                : 'rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-200 hover:text-emerald-700'
                            }
                          >
                            {number}
                          </Link>
                        </span>
                      );
                    })}

                    {currentPage < totalPages ? (
                      <Link
                        href={`?page=${currentPage + 1}`}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
                      >
                        Berikutnya →
                      </Link>
                    ) : (
                      <span className="rounded-xl border border-slate-100 px-4 py-2 text-sm font-bold text-slate-300">
                        Berikutnya →
                      </span>
                    )}
                  </nav>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-600">
                Belum ada artikel yang ditambahkan.
              </div>
            )}
          </section>
        </article>
      </main>

      <Footer onSelectCategory={() => undefined} />
    </div>
  );
}
