const STORAGE_KEY = 'tasks'

const DEFAULT_TASKS = [
  {
    id: crypto.randomUUID(),
    title: 'Review Q3 strategy proposal and prepare alignment presentation',
    completed: false,
    priority: 'high',
    dueDate: '2026-12-08',
    project: 'Marketing Q3',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur beatae earum exercitationem natus in repellat velit reprehenderit reiciendis dolore nostrum?',
    createdAt: new Date().toISOString(),
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: 'Kumpulkan data performa Q3 dari tiap channel',
        completed: true,
      },
      { id: crypto.randomUUID(), title: 'Susun draft slide strategi untuk Q4', completed: false },
      { id: crypto.randomUUID(), title: 'Minta review dari tim marketing lead', completed: false },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Prepare weekly team sync notes',
    completed: false,
    priority: 'medium',
    dueDate: '2026-12-05',
    project: 'Internal',
    description: 'Siapkan agenda dan catatan progres untuk sync mingguan tim.',
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: crypto.randomUUID(), title: 'Tulis agenda meeting', completed: true },
      { id: crypto.randomUUID(), title: 'Rangkum progres masing-masing anggota', completed: true },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Fix responsive layout bug on mobile checkout page',
    completed: false,
    priority: 'high',
    dueDate: '2026-12-03',
    project: 'Product Engineering',
    description:
      'Tombol checkout tertutup keyboard di beberapa device Android saat form alamat dibuka.',
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: crypto.randomUUID(), title: 'Reproduce bug di emulator Android', completed: true },
      {
        id: crypto.randomUUID(),
        title: 'Perbaiki CSS viewport pada form alamat',
        completed: false,
      },
      { id: crypto.randomUUID(), title: 'Test ulang di 3 ukuran layar berbeda', completed: false },
      { id: crypto.randomUUID(), title: 'Deploy ke staging untuk QA', completed: false },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Prepare onboarding materials for new hire',
    completed: false,
    priority: 'low',
    dueDate: '2026-12-12',
    project: 'People Ops',
    description: 'Siapkan dokumen onboarding dan akses tools untuk karyawan baru minggu depan.',
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: crypto.randomUUID(), title: 'Siapkan akun email dan Slack', completed: false },
      { id: crypto.randomUUID(), title: 'Update dokumen panduan onboarding', completed: false },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Finalize budget report for December',
    completed: true,
    priority: 'medium',
    dueDate: '2026-11-30',
    project: 'Finance',
    description: 'Rekap dan finalisasi laporan budget bulanan sebelum dikirim ke manajemen.',
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: crypto.randomUUID(), title: 'Konsolidasi data dari tiap divisi', completed: true },
      { id: crypto.randomUUID(), title: 'Review dengan finance lead', completed: true },
      { id: crypto.randomUUID(), title: 'Kirim laporan final ke manajemen', completed: true },
    ],
  },
]

export const taskService = {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw == null) {
      this.saveAll(DEFAULT_TASKS)
      return DEFAULT_TASKS
    }
    return JSON.parse(raw)
  },

  saveAll(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },
}
