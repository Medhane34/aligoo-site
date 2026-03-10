import { defineCliConfig } from 'sanity/cli'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineCliConfig({
  api: {
    projectId: 'mcpko9lw',
    dataset: 'production'
  },
  vite: (config) => {
    return {
      ...config,
      plugins: [...(config.plugins || []), nodePolyfills({
        include: ['util']
      })],
    }
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    autoUpdates: false,
  },
})
