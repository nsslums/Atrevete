import { css } from '@emotion/react';
import React from 'react';
import {GrSearch} from '@react-icons/all-files/gr/GrSearch'
import Modal from 'react-modal'
import { Link } from 'gatsby-link';
import { GetSlug } from '../../api/getSlug';

let root
if(typeof document !== `undefined`){
  root = document.getElementById('storybook-root') ||  document.getElementById('___gatsby')
}
if(!root) root =  "";

Modal.setAppElement(root)

interface SearchProps {
  open?: boolean,
  data: any
}

const buttonCss = css({
    position: "fixed",
    right: 30,
    bottom: 30,
    backgroundColor: "white",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: '0 0 20px rgba(0,0,0,0.4)',
    width: 45,
    height: 45,
    zIndex: 10,
    '&:hover': {
      background: 'rgba(255,255,255,0.8)'
    }
})

const content = css({
  
})

const modalRoot = css({
  width: "80%",
  maxWidth: 760,
  position: "absolute",
  left: "50%",
  top: "15%",
  transform: "translateX(-50%)",
  boxSizing: "border-box",
})

const searchInputRoot = css({
  backgroundColor: 'white',
  height: 40,
  borderRadius: 5 ,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  boxSizing: "border-box",
  padding: "0 15px",
})

const resultCss = css({
  width: "100%",
  maxHeight: 300,
  backgroundColor: 'white',
  borderRadius: "0 0 5px 5px",
  color: 'black',
  boxSizing: "border-box",
  padding: 10,
  borderTop: "1px solid #cfcfcf",
})

const resultBlock = css({
  position: "relative",

  "&:not(:last-child)": {
    marginBottom: ".8em",
    
    "&:after":{
      content: '""',
      position: "absolute",
      width: "100%",
      height: 1,
      backgroundColor: "#cfcfcf",
      bottom: -5,
      left: "0",
    }
  }
})

const resultfield = css({
  padding: "5px",
  borderRadius: 5,
  fontSize: "1em",
  display: 'block',
})

const hover = css({
  "&:hover":{
    backgroundColor: "#efefef"
  },
  "&:focus-visible":{
    backgroundColor: "#efefef"
  },
})

export const Search = ({
  open = false,
  data
}: SearchProps) => {

  const initResult = {posts: [], events: []}
  const [modalIsOpen, setIsOpen] = React.useState(open)
  const [value, setValue] = React.useState('')
  const [result, setResult] = React.useState(initResult)

  const onChange = (e:any) =>{
    const query = e.target.value
    setValue(query)

    const pattern = '/^\s/'
    if(!query || query.match(pattern)){
      setResult(initResult)
        return
    }

    const posts = searchPost(data.allContentfulPost.nodes, query)
    const events = searchEvent(data.allContentfulEvent.nodes, query)

    const newData = {posts, events}
    setResult(newData)
  }

  const existRichText = (richText: any, query: string) =>{
    if('value' in richText){
        return richText.value.toLowerCase().includes(query.toLowerCase()) //True/False
    }else{
        for(let i = 0; i < richText.content.length;i++){
            if(existRichText(richText.content[i], query)) {
                return true
            }
        }
    }
    return false
}

  const searchPost = (posts: [], query: string) => {
    return posts.filter((post: {title: string, content:any, }) => { //配列を返す
      const title = post.title
      const isExistTitle = title.toLowerCase().includes(query.toLowerCase()) //True/False
      if(isExistTitle)  return true

      const content = post.content?.raw
      const isExistContent = content ? existRichText(JSON.parse(content), query) : false
      return  isExistContent
    })
  }

  const searchEvent = (events: [], query: string) => {
    return events.filter((event: {title: string, date:string, start_reception:string, end_reception:string, requirements: any, overview: any }) => { //配列を返す
      const title = event.title
      const isExistTitle = title.toLowerCase().includes(query.toLowerCase()) //True/False
      if(isExistTitle)  return true

      const date = event.date
      const isExistDate = date ? date.toLowerCase().includes(query.toLowerCase()) : false //True/False
      if(isExistDate)  return true
      
      const start_reception = event.start_reception
      const isExistStart_reception = start_reception ? start_reception.toLowerCase().includes(query.toLowerCase()) : false //True/False
      if(isExistStart_reception)  return true

      const end_reception = event.end_reception
      const isExistEnd_reception = end_reception ? end_reception.toLowerCase().includes(query.toLowerCase()) : false //True/False
      if(isExistEnd_reception)  return true

      const requirements = event.requirements?.raw
      const isExistRequirements = requirements ? existRichText(JSON.parse(requirements), query) : false
      if(isExistRequirements)  return true

      const overview = event.overview?.raw
      const isExistOverview = overview ? existRichText(JSON.parse(overview), query) : false
      return  isExistOverview
    })
  }

  const { posts, events } = result

  const inputCss = value ? [searchInputRoot, css({borderRadius: "5px 5px 0 0"})] : searchInputRoot

  return (
    <>
      <button id="SearchButton" aria-label='SearchButton' css={buttonCss} onClick={(e:any) => setIsOpen(true)}>
          <GrSearch />
      </button>
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={(e:any) => setIsOpen(false)}
        css={content}
      >
        <div css={modalRoot}>
          <div css={inputCss}>
            <label htmlFor='search' css={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><GrSearch /></label>
            <input autoFocus={true} value={value} id='search' onChange={onChange} css={{color: 'black', marginLeft: 10, width: "100%"}} placeholder='キーワードを入力...' autoComplete='off'/>
          </div>
          {value ? 
            <div css={resultCss}>
              {posts.length > 0 || events.length > 0 ?
                <>
                  {posts.length > 0 ? 
                  <div css={resultBlock}><p css={{fontSize: ".8em"}}>投稿</p>
                    {posts.map(post =>(
                      <Link to={"/post/"+ GetSlug(post)} css={[resultfield, hover]} key={post.title}>{post.title}</Link>
                    ))}
                  </div> 
                  :
                  false}
                  {events.length > 0 ? 
                  <div css={resultBlock}><p css={{fontSize: ".8em"}}>イベント</p>
                    {events.map(event =>(
                      <Link to={"/event/"+ GetSlug(event)} css={[resultfield, hover]} key={event.title}>{event.title}</Link>
                    ))}
                  </div> 
                  :
                  false
                  }
                </>
                :
                <div css={resultBlock}>
                  <p css={[resultfield, css({color: "#cfcfcf"})]}>no result...</p>
                </div>
              }
            </div>
          :
            false
          }
        </div>
      </Modal>
    </>
  )
}

export default Search;