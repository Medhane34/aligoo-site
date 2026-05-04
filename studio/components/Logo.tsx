// studio/src/components/Logo.tsx
import { Flex, Text, Box } from '@sanity/ui'
import { usePrefersDark } from '@sanity/ui'   // Official hook for dark mode detection

// Import logo as URL (works reliably)
import logoUrl from './logo.jpeg'

export function AligooLogo() {
  const isDark = usePrefersDark()   // Returns true if dark mode is active

  return (
    <Flex align="center" gap={3}>
      <Box
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: isDark ? '#1F2937' : '#F8FAFC',
        }}
      >
        {/* <img
          src={logoUrl}
          alt="Aligoo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '2px',
          }}
        /> */}
      </Box>

      <Text
        weight="bold"
        size={4}
        style={{
          color: isDark ? '#FFFFFF' : '#1F2937',
          letterSpacing: '-0.025em',
        }}
      >
        Aligoo
      </Text>
    </Flex>
  )
}