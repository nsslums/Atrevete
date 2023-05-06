import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

const FormPage: React.FC<PageProps> = () => {
    const [formValue, setFormValue] = React.useState({name: '', email: '', phone: '', subject: '' ,content: ''})

    const changeHandle = (e) =>{
        console.log(formValue)
        setFormValue({...formValue, [e.target.id]: e.target.value})
    }

    const onSubmit = async (e) =>{
        e.preventDefault()  // デフォルトの動作のキャンセル
        const response = await window.fetch('/api/contact', {
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
        <form action="/api/contact" method="post" onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">name</label>
                <input type="name" name="name" id="name" value={formValue.name} onChange={changeHandle} required/>
            </div>
            <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" value={formValue.email} onChange={changeHandle} required/>
            </div>
            <div>
                <label htmlFor="phone">phone</label>
                <input type="tel" name="phone" id="phone" value={formValue.phone} onChange={changeHandle}/>
            </div>
            <div>
                <label htmlFor="content">subject</label>
                <input type="text" name="subject" id="subject" value={formValue.subject} onChange={changeHandle} required/>
            </div>
            <div>
                <label htmlFor="subject">content</label>
                <textarea name="content" id="content" value={formValue.content} onChange={changeHandle} required/>
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
    )
}

export default FormPage

export const Head: HeadFC = () => <title>Form Page</title>
