import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {contentful} from "../lib/contentful-client";

const HomePage = ({
                      page,
                      preview
                  }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>Test</div>
    )
}

export const getStaticProps = async ({preview}: GetStaticPropsContext) => {
    const {pageCollection: homePageCollection} = await contentful(!!preview).getPageBySlug({slug: '/'})
    if (!homePageCollection || !homePageCollection.items.length) {
        return {
            props: {
                page: {
                    sys: {
                        id: 'home'
                    },
                    slug: '/',
                    sectionCollection: {items: []}
                },
                preview: !!preview
            },
            revalidate: 1
        }
    }

    return {
        props: {
            page: homePageCollection.items[0],
            preview: !!preview
        },
        revalidate: 1
    }
}

export default HomePage;