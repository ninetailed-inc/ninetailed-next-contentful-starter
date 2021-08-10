import React from 'react';
import Image from 'next/image'
import {documentToReactComponents, Options} from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES, MARKS} from "@contentful/rich-text-types";
import { MergeTag } from '@ninetailed/client-sdk-nextjs';

import {HeroFragment, HeroHeadlineLinks} from '../../@generated/gql'

const headlineOptions = (links: HeroHeadlineLinks): Options => {
    const entryMap = new Map();
    for (const entry of links.entries.inline) {
        entryMap.set(entry?.sys.id, entry);
    }

    return {
        renderNode: {
            [INLINES.EMBEDDED_ENTRY]: (node) => {
                const id = node.data.target.sys.id;
                if (id) {
                    const mergeTag = entryMap.get(id);
                    return <MergeTag id={mergeTag.id}/>;
                }
                return <>{`${node.nodeType} ${id}`}</>;
            },
            [BLOCKS.PARAGRAPH]: (node, children) => <span className='w-max bg-white block px-6'>{children}</span>
        },
        renderMark: {
            [MARKS.BOLD]: text => <span className='text-pink'>{text}</span>
        }
    };
};

export const Hero: React.FC<HeroFragment> = ({headline, subline, image}) => {
    return <div>
        {headline && documentToReactComponents(headline.json, headlineOptions(headline.links))}
        {subline && documentToReactComponents(subline.json)}
        {image && <Image src={image.url!} width={400} height={200}/>}
    </div>
}