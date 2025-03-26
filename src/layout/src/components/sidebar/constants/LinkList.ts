import type {
  ISidebarItem
} from '@/layout/src/components/sidebar/misc/interfaces/sidebar.interfaces.ts'

export const mainLinks: ISidebarItem[] = [
  {
    title: 'Список задач',
    to: { name: 'todo' },
    icon: 'list-check',
  },
  {
    title: 'Погода',
    to: { name: 'weather' },
    icon: 'sun',

  },
  {
    title: 'Плиточная раскладка',
    to: { name: 'masonry' },
    icon: 'objects-column',

  },
  {
    title: 'Markdown',
    to: { name: 'markdown' },
    icon: 'pen-to-square',

  },
];
