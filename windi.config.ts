import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: true,
  shortcuts: {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'x-center': {
      '@apply': 'left-1/2',
      transform: 'translateX(-50%)',
    },
    'y-center': {
      '@apply': 'top-1/2',
      transform: 'translateY(-50%)',
    },
  },
})
