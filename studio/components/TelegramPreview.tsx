import React from 'react'
import { Card, Flex, Text } from '@sanity/ui'
import imageUrlBuilder from '@sanity/image-url'
import { SanityDocument } from 'sanity'

const builder = imageUrlBuilder({
    projectId: 'mcpko9lw',
    dataset: 'production',
})

function urlFor(source: any) {
    if (!source) return undefined
    return builder.image(source)
}

// Define types for Portable Text
interface PortableTextBlock {
    _type: 'block'
    children?: {
        text: string
    }[]
}

interface PortableTextImage {
    _type: 'image'
    asset: {
        _ref: string
    }
}

interface CtaButton {
    text: string
    type: 'url' | 'callback'
    url?: string
}

interface CampaignDocument extends SanityDocument {
    content?: (PortableTextBlock | PortableTextImage)[]
    ctaButtons?: CtaButton[]
}

interface TelegramPreviewProps {
    document: {
        displayed: CampaignDocument
    }
}

export default function TelegramPreview(props: TelegramPreviewProps) {
    const { displayed } = props.document
    const { content, ctaButtons } = displayed

    // Extract text and image from Portable Text content
    const textBlocks = content?.filter((block): block is PortableTextBlock => block._type === 'block')
    const imageBlock = content?.find((block): block is PortableTextImage => block._type === 'image')

    // Simple serializer for preview text
    const messageText = textBlocks
        ?.map(block => block.children?.map(child => child.text).join(''))
        .join('\n\n')

    return (
        <Card padding={4} style={{ height: '100vh', overflow: 'auto' }}>
            <Flex justify="center" align="center" style={{ minHeight: '100%' }}>
                <div style={styles.phoneContainer}>
                    {/* iPhone Frame */}
                    <div style={styles.phoneFrame}>
                        {/* Notch */}
                        <div style={styles.notch} />

                        {/* Screen */}
                        <div style={styles.screen}>
                            {/* Telegram Header */}
                            <div style={styles.telegramHeader}>
                                <div style={styles.headerContent}>
                                    <div style={styles.backButton}>←</div>
                                    <div style={styles.headerInfo}>
                                        <div style={styles.headerTitle}>Aligoo Digital</div>
                                        <div style={styles.headerSubtitle}>online</div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Background */}
                            <div style={styles.chatBackground}>
                                {/* Message Bubble */}
                                <div style={styles.messageContainer}>
                                    <div style={styles.messageBubble}>
                                        {/* Image */}
                                        {imageBlock && urlFor(imageBlock) && (
                                            <div style={styles.imageContainer}>
                                                <img
                                                    src={urlFor(imageBlock)?.width(600).url()}
                                                    alt="Campaign"
                                                    style={styles.messageImage}
                                                />
                                            </div>
                                        )}

                                        {/* Text */}
                                        {messageText && (
                                            <div style={styles.messageText}>
                                                {messageText.split('\n').map((line, i) => (
                                                    <React.Fragment key={i}>
                                                        {line}
                                                        {i < messageText.split('\n').length - 1 && <br />}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        )}

                                        {/* Buttons */}
                                        {ctaButtons && ctaButtons.length > 0 && (
                                            <div style={styles.buttonsContainer}>
                                                {ctaButtons.map((button, index) => (
                                                    <div key={index} style={styles.telegramButton}>
                                                        {button.text}
                                                        {button.type === 'url' && (
                                                            <span style={styles.buttonIcon}>↗</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Timestamp */}
                                        <div style={styles.timestamp}>
                                            {new Date().toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Empty State */}
                                {!messageText && !imageBlock && (
                                    <div style={styles.emptyState}>
                                        <Text muted>Start typing to see preview...</Text>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Flex>
        </Card>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    phoneContainer: {
        position: 'relative',
        width: '375px',
        height: '812px',
        margin: '20px auto',
    },
    phoneFrame: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        borderRadius: '40px',
        padding: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
    },
    notch: {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '180px',
        height: '28px',
        backgroundColor: '#000',
        borderRadius: '0 0 20px 20px',
        zIndex: 10,
    },
    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0f1419',
        borderRadius: '32px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    telegramHeader: {
        backgroundColor: '#17212b',
        padding: '12px 16px',
        paddingTop: '40px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    backButton: {
        fontSize: '24px',
        color: '#8774e1',
        cursor: 'pointer',
    },
    headerInfo: {
        flex: 1,
    },
    headerTitle: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
    },
    headerSubtitle: {
        color: '#8774e1',
        fontSize: '13px',
    },
    chatBackground: {
        flex: 1,
        backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpattern id=\'pattern\' x=\'0\' y=\'0\' width=\'20\' height=\'20\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.02\'/%3E%3C/pattern%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23pattern)\'/%3E%3C/svg%3E")',
        backgroundColor: '#0f1419',
        padding: '16px',
        overflowY: 'auto',
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '8px',
        maxWidth: '85%',
    },
    messageBubble: {
        backgroundColor: '#182533',
        borderRadius: '12px 12px 12px 12px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        width: '100%',
        marginBottom: '4px',
    },
    imageContainer: {
        width: '100%',
    },
    messageImage: {
        width: '100%',
        display: 'block',
        borderRadius: '12px 12px 0 0',
    },
    messageText: {
        color: '#fff',
        fontSize: '15px',
        lineHeight: '1.4',
        padding: '8px 12px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    buttonsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginTop: '2px',
    },
    telegramButton: {
        backgroundColor: '#2b343f', // Darker background like screenshot
        border: 'none',
        color: '#fff',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        position: 'relative',
    },
    buttonIcon: {
        position: 'absolute',
        right: '12px',
        opacity: 0.7,
        fontSize: '12px',
    },
    timestamp: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: '11px',
        padding: '0 12px 6px',
        textAlign: 'right',
        marginTop: '-4px',
    },
    emptyState: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'rgba(255,255,255,0.3)',
    },
}
