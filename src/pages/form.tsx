import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

const FormPage: React.FC<PageProps> = () => {
    const [formValue, setFormValue] = React.useState({email: '', content: ''})

    const changeHandle = (e) =>{
        setFormValue({...formValue, [e.target.id]: e.target.value})
        console.log(formValue)
    }

    const onSubmit = async (e) =>{
        e.preventDefault()  // デフォルトの動作のキャンセル
        const response = await window.fetch('/api/form', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formValue),
        })
        .then(res => res.json())
        console.log(response)
    }

    return (
        <form action="/api/form" method="post" onSubmit={onSubmit}>
            <label htmlFor="email">email</label>
            <input type="email" name="email" id="email" value={formValue.email} onChange={changeHandle} required/>
            <label htmlFor="content">content</label>
            <input type="text" name="content" id="content" value={formValue.content} onChange={changeHandle} required/>
            <input type="submit" />
        </form>
    )
}

export default FormPage

export const Head: HeadFC = () => <title>Form Page</title>
