import React from 'react';
import Image from 'next/image'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {HeroFragment} from '../../@generated/gql'

export const Hero: React.FC<HeroFragment> = ({headline, subline, image}) => {
    return <div>
        {headline && documentToReactComponents(headline.json)}
        {subline && documentToReactComponents(subline.json)}
        {image && <Image src={image.url!} width={400} height={200}/>}
    </div>
}