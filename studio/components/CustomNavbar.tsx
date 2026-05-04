// studio/src/components/CustomNavbar.tsx
import { Flex, Grid, Button, Select, Box, Label, Card } from '@sanity/ui'
import { useState, useEffect } from 'react'
import { AligooLogo } from './Logo'
import { useRouter } from 'sanity/router'
import { useWorkspace } from 'sanity'

export function CustomNavbar() {
    const router = useRouter()
    const { dataset } = useWorkspace() as { dataset: string }

    const [activeTool, setActiveTool] = useState('structure')

    // Sync active tool with current route
    useEffect(() => {
        const currentPath = window.location.pathname

        if (currentPath.includes('/presentation')) {
            setActiveTool('presentation')
        } else if (currentPath.includes('/workflow-manager')) {
            setActiveTool('workflow')
        } else if (currentPath.includes('/calendar')) {
            setActiveTool('calendar')
        } else {
            setActiveTool('structure')
        }
    }, [])

    const handleTabClick = (tool: string) => {
        setActiveTool(tool)

        if (tool === 'structure') {
            router.navigate({ tool: 'structure' })
        } else if (tool === 'presentation') {
            router.navigate({ tool: 'presentation' })
        } else if (tool === 'workflow') {
            router.navigate({ tool: 'workflow-manager' }) // Correct plugin tool name
        } else if (tool === 'calendar') {
            router.navigate({ tool: 'calendar' })         // Correct plugin tool name
        }
    }

    const handleDatasetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDataset = e.target.value
        if (newDataset === 'automation') {
            window.location.href = '/automation'
        } else {
            window.location.href = '/studio'
        }
    }

    return (
        <Card padding={3} borderBottom>
            <Grid columns={3} gap={4} style={{ width: '100%', alignItems: 'center' }}>

                {/* Left: Logo */}
                <Flex align="center">
                    <AligooLogo />
                </Flex>

                {/* Center: Clickable Tabs */}
                <Flex justify="center" gap={1}>
                    <Button
                        mode={activeTool === 'structure' ? 'default' : 'bleed'}
                        text="Structure"
                        padding={3}
                        onClick={() => handleTabClick('structure')}
                    />
                    <Button
                        mode={activeTool === 'presentation' ? 'default' : 'bleed'}
                        text="Presentation"
                        padding={3}
                        onClick={() => handleTabClick('presentation')}
                    />
                    <Button
                        mode={activeTool === 'workflow' ? 'default' : 'bleed'}
                        text="Workflow"
                        padding={3}
                        onClick={() => handleTabClick('workflow')}
                    />
                    <Button
                        mode={activeTool === 'calendar' ? 'default' : 'bleed'}
                        text="Publishing Calendar"
                        padding={3}
                        onClick={() => handleTabClick('calendar')}
                    />
                </Flex>

                {/* Right: Dataset Selector */}
                <Flex justify="flex-end" align="center" gap={4}>
                    <Box>
                        <Label size={1} muted style={{ marginBottom: '4px', display: 'block' }}>
                            Dataset
                        </Label>
                        <Select
                            value={dataset || 'production'}
                            onChange={handleDatasetChange}
                            style={{ minWidth: '150px' }}
                        >
                            <option value="production">Production</option>
                            <option value="automation">Automation</option>
                        </Select>
                    </Box>
                </Flex>

            </Grid>
        </Card>
    )
}