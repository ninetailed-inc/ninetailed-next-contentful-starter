import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {contentful} from "../lib/contentful-client";
import {Hero} from '../components/Hero';

const HomePage = ({
                      page,
                      preview
                  }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>{page?.sectionsCollection?.items.map(section => {
            if (section && section.__typename === 'Hero') {
                return <Hero key={section.sys.id} {...section}/>
            }

            return null;
        })}</div>
    )
}

export const getStaticProps = async ({preview}: GetStaticPropsContext) => {
    const {pageCollection: homePageCollection} = await contentful(!!preview).getPageBySlug({slug: '/'})
    if (!homePageCollection || !homePageCollection.items.length) {
        throw new Error('Please setup your homepage on contentful.');
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