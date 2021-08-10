import {GraphQLClient} from 'graphql-request'
import {getSdk} from '../@generated/gql'

const endpoint = process.env.CONTENTFUL_GRAPHQL_ENDPOINT

export const contentful = (preview?: boolean) =>
    getSdk(
        new GraphQLClient(endpoint as string, {
            headers: {
                Authorization: `Bearer ${
                    preview
                        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                        : process.env.CONTENTFUL_ACCESS_TOKEN
                }`
            }
        })
    )