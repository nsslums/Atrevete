import { css } from "@emotion/react";
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import * as React from "react";
import {
    ContentfulRichTextGatsbyReference,
    renderRichText,
    RenderRichTextData
} from "gatsby-source-contentful/rich-text";

const peopleStyle = css({
    width: 300,
    // minHeight: 300,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // border: 'solid 1px white',
    padding: '0 2em',
    boxSizing: 'border-box',
});

const avatarStyle = css({
    width: 120,
    height: 120,
    border: 'solid 4px white',
    borderRadius: 100,
})

const textStyle = css({
    maxWidth: '90%'
})

interface peopleProps {
    name: string,
    image?: IGatsbyImageData,
    profile?: RenderRichTextData<ContentfulRichTextGatsbyReference>,
    isStaff: boolean,
}

export const peopleProfile = ({
    name, image, profile, isStaff}:peopleProps
) =>{
    return(
        <div css={peopleStyle}>
            {!image ? 
                <div css={avatarStyle}></div>
            :
                <GatsbyImage css={avatarStyle} alt={"profile_icon"} image={image}/>
            }
            <p css={{fontWeight: '700',fontSize: '1.5em',margin: '30px 0',color: '#C5B286'}}>{name}</p>
            <div css={textStyle}>{!profile ? false : renderRichText(profile)}</div>
        </div>
    )
}

export default peopleProfile