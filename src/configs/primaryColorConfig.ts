export type PrimaryColorConfig = {
  name?: string
  light?: string
  main: string
  dark?: string
}

// Primary color config object
const primaryColorConfig: PrimaryColorConfig[] = [
  {
    name: 'primary-1',
    light: '#8789FF',
    main: '#696CFF',
    dark: '#5E61E6'
  },
  {
    name: 'primary-2',
    light: '#3DA8A9',
    main: '#0D9394',
    dark: '#0B8485'
  },
  {
    name: 'primary-3',
    light: '#FFBB4A',
    main: '#FFAB1D',
    dark: '#E5991A'
  },
  {
    name: 'primary-4',
    light: '#EF6382',
    main: '#EB3D63',
    dark: '#D33659'
  },
  {
    name: 'primary-5',
    light: '#4CA7EF',
    main: '#2092EC',
    dark: '#1C83D4'
  }
]

export default primaryColorConfig
