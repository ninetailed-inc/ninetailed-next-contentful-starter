import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {
    PersonalizationProvider,
} from '@ninetailed/client-sdk-nextjs';


function MyApp({Component, pageProps}: AppProps) {
    return <PersonalizationProvider
        analyticsPlugins={{
            googleAnalytics: {
                trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '',
                actionTemplate: 'Seen Component - Audience:{{ audience.name }}',
                labelTemplate:
                    '{{ baselineOrVariant }}:{{ component.__typename }} - {{ component.internalName }}'
            }
        }}
        apiKey={process.env.NEXT_PUBLIC_NINETAILED_API_KEY ?? ''}>
        <Component {...pageProps} />
    </PersonalizationProvider>
}

export default MyApp
