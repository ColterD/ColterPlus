export default {
    theme: {
      colors: {
        swarm: {
          '950': 'rgb(7, 13, 24)',
          '800': 'rgb(26, 44, 77)',
          '200': 'rgb(188, 213, 255)',
        },
        meadow: {
          '950': 'rgb(5, 24, 12)',
          '800': 'rgb(25, 77, 51)',
          '200': 'rgb(152, 245, 200)',
        },
        merlin: {
          '950': 'rgb(24, 18, 5)',
          '800': 'rgb(77, 58, 25)',
          '200': 'rgb(245, 211, 152)',
        },
        carnation: {
          '950': 'rgb(24, 5, 9)',
          '800': 'rgb(77, 25, 34)',
          '200': 'rgb(245, 152, 170)',
        },
      }
    },
    shortcuts: {
      'btn': 'px-4 py-2 rounded-lg bg-swarm-800 text-white hover:opacity-90 transition-opacity',
      'card': 'p-4 rounded-lg bg-swarm-950 shadow-md',
      'input': 'p-2 rounded-md border border-swarm-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-meadow-800',
    }
  }