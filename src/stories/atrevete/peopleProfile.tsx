import { css } from "@emotion/react";
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import * as React from "react";
import {
    ContentfulRichTextGatsbyReference,
    renderRichText,
    RenderRichTextData
} from "gatsby-source-contentful/rich-text";

const peopleStyle = css({
    width: 400,
    maxWidth: '90vw',
    // minHeight: 300,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // border: 'solid 1px white',
    padding: '2em',
    boxSizing: 'border-box',
    textAlign: 'center',
});

const avatarStyle = css({
    width: 120,
    height: 120,
    border: 'solid 4px white',
    borderRadius: 100,
    overflow: 'hidden',
})

const nameStyle = css({
    fontWeight: '700',
    fontSize: '1.5em',
    marginBottom: '30px',
    color: '#C5B286'
})

const nameSubStyle = css({
    marginTop: '20px',
    marginBottom: '5px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
})

const textStyle = css({
    maxWidth: '90%',
    textAlign: 'left',
})

interface peopleProps {
    name: string,
    nameSub?: string,
    image?: IGatsbyImageData,
    profile?: RenderRichTextData<ContentfulRichTextGatsbyReference>,
    isStaff: boolean,
}

export const peopleProfile = ({
    name, nameSub, image, profile, isStaff}:peopleProps
) =>{
    return(
        <div css={peopleStyle}>
            {!image ?
                <div css={avatarStyle}></div>
            :
                <GatsbyImage css={avatarStyle} alt={"profile_icon"} image={image}/>
            }
            {nameSub != null ?
                <p css={nameSubStyle}>{nameSub}</p>
            :
                <div css={{height:23}} />
            }
            <p css={nameStyle}>{name}</p>
            <div css={textStyle}>{!profile ? false : renderRichText(profile)}</div>
        </div>
    )
}

export default peopleProfile