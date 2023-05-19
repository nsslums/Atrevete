import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import { Common } from "../components/common"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Common>
        <p>thanks</p>
    </Common>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
