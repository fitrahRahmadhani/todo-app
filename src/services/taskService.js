const STORAGE_KEY = 'tasks'

// Tanggal relatif terhadap hari ini, supaya data demo selalu terasa "baru"
const daysFromNow = (days) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

const createDefaultTasks = () => [
  {
    id: crypto.randomUUID(),
    title: 'Selamat datang di NotoTask! Coba selesaikan tugas ini',
    completed: false,
    priority: 'high',
    dueDate: daysFromNow(0),
    project: 'pribadi',
    description:
      'NotoTask adalah aplikasi todo list gratis tanpa login. Data tersimpan di browser Anda, jadi langsung pakai tanpa daftar.',
    createdAt: daysFromNow(0),
    completedAt: '',
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: 'Klik kotak centang untuk menandai selesai',
        completed: true,
      },
      {
        id: crypto.randomUUID(),
        title: 'Buka tugas ini untuk melihat detailnya',
        completed: false,
      },
      { id: crypto.randomUUID(), title: 'Tambahkan tugas pertama Anda sendiri', completed: false },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: 'Siapkan agenda rapat mingguan tim',
    completed: false,
    priority: 'medium',
    dueDate: daysFromNow(0),
    project: 'kerja',
    description: 'Tulis poin pembahasan dan rangkum progres tiap anggota sebelum rapat dimulai.',
    createdAt: daysFromNow(-1),
    completedAt: '',
    subtasks: [
      { id: crypto.randomUUID(), title: 'Tulis agenda rapat', completed: true },
      { id: crypto.randomUUID(), title: 'Rangkum progres masing-masing anggota', completed: false },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: 'Belanja kebutuhan dapur',
    completed: false,
    priority: 'low',
    dueDate: daysFromNow(0),
    project: 'pribadi',
    description: 'Cek stok bahan di rumah dulu sebelum berangkat ke pasar.',
    createdAt: daysFromNow(-1),
    completedAt: '',
    subtasks: [
      { id: crypto.randomUUID(), title: 'Buat daftar belanja', completed: false },
      { id: crypto.randomUUID(), title: 'Beli sayur dan buah', completed: false },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: 'Kirim laporan progres proyek ke atasan',
    completed: false,
    priority: 'high',
    dueDate: daysFromNow(1),
    project: 'kerja',
    description: 'Laporan berisi pencapaian minggu ini dan rencana minggu depan.',
    createdAt: daysFromNow(-2),
    completedAt: '',
    subtasks: [
      { id: crypto.randomUUID(), title: 'Kumpulkan data pencapaian', completed: true },
      { id: crypto.randomUUID(), title: 'Susun ringkasan laporan', completed: false },
      { id: crypto.randomUUID(), title: 'Kirim lewat email', completed: false },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: 'Belajar dasar Vue 3 Composition API',
    completed: false,
    priority: 'medium',
    dueDate: daysFromNow(3),
    project: 'belajar',
    description: 'Pelajari ref, computed, watch, dan cara membuat composable sendiri.',
    createdAt: daysFromNow(-1),
    completedAt: '',
    subtasks: [
      { id: crypto.randomUUID(), title: 'Baca dokumentasi resmi', completed: false },
      { id: crypto.randomUUID(), title: 'Latihan membuat komponen sederhana', completed: false },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: 'Olahraga ringan 30 menit',
    completed: false,
    priority: 'low',
    dueDate: daysFromNow(5),
    project: 'pribadi',
    description: 'Jalan pagi atau jogging santai untuk menjaga kebugaran.',
    createdAt: daysFromNow(0),
    completedAt: '',
    subtasks: [],
  },

  {
    id: crypto.randomUUID(),
    title: 'Rapikan dan arsipkan dokumen bulan lalu',
    completed: true,
    priority: 'medium',
    dueDate: daysFromNow(-1),
    project: 'kerja',
    description: 'Pindahkan dokumen lama ke folder arsip agar ruang kerja lebih rapi.',
    createdAt: daysFromNow(-4),
    completedAt: daysFromNow(-1),
    subtasks: [
      { id: crypto.randomUUID(), title: 'Pilah dokumen yang masih dipakai', completed: true },
      { id: crypto.randomUUID(), title: 'Pindahkan sisanya ke arsip', completed: true },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: 'Bayar tagihan listrik dan internet',
    completed: true,
    priority: 'high',
    dueDate: daysFromNow(-2),
    project: 'pribadi',
    description: 'Pembayaran bulanan sudah selesai.',
    createdAt: daysFromNow(-5),
    completedAt: daysFromNow(-2),
    subtasks: [],
  },
]

export const taskService = {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw == null) {
      const defaults = createDefaultTasks()
      this.saveAll(defaults)
      return defaults
    }
    return JSON.parse(raw)
  },

  saveAll(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },
}
