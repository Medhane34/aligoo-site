// components/wrappers/VideoGreetingWrapper.tsx
import dynamic from 'next/dynamic'
import { replacePlaceholders } from '@/utils/contractUtils'

const VideoGreeting = dynamic(() => import('@/components/proposal/VideoGreeting'), {
    ssr: false,
    loading: () => null,
})

interface VideoGreetingWrapperProps {
    clientName: string
    videoGreeting?: any // ← any on purpose for raw debug
}

export default function VideoGreetingWrapper({ clientName, videoGreeting }: VideoGreetingWrapperProps) {
    // NUCLEAR LOGGING — THIS WILL TELL US EVERYTHING
    console.log('VideoGreetingWrapper — RAW DATA:', videoGreeting)
    console.log('Enabled?', videoGreeting?.enabled)
    console.log('Has videoUrl?', !!videoGreeting?.videoUrl)
    console.log('Tooltip text:', videoGreeting?.tooltipText)

    if (!videoGreeting) {
        console.log('videoGreeting is NULL or undefined')
        return null
    }

    if (videoGreeting.enabled === false) {
        console.log('Video disabled in Sanity')
        return null
    }

    if (!videoGreeting.videoUrl) {
        console.log('No videoUrl — file not uploaded or query wrong')
        return null
    }

    const dynamicTooltip = replacePlaceholders(
        videoGreeting.tooltipText || 'Hi {{clientName}}, watch this!',
        { clientName }
    )

    console.log('VIDEO GREETING RENDERING NOW!')
    console.log({ clientName, videoUrl: videoGreeting.videoUrl, dynamicTooltip })

    return (
        <VideoGreeting
            clientName={clientName}
            videoUrl={videoGreeting.videoUrl}
            thumbnailUrl={videoGreeting.thumbnailUrl || '/team/avatar-1.jpeg'}
            tooltipText={dynamicTooltip}
        />
    )
}