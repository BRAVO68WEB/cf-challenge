import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    const { key } = router.query
    console.log(key)
    return <p>Post: {key}</p>
  }
  
  export default Post