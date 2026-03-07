/*import {useState,useEffect} from "react"
import axios from "axios"
import {Container,Row,Col,Form,Button,Card} from "react-bootstrap"

function HomeAdmin(){

const [data,setData] = useState(null)

useEffect(()=>{

 axios.get("https://collegemilan-backend-2.onrender.com/api/admin/home/home-page")
 .then(res=>setData(res.data))

},[])

const handleHeroChange = (e)=>{

 setData({
  ...data,
  heroSection:{
   ...data.heroSection,
   [e.target.name]:e.target.value
  }
 })

}

const updatePage = ()=>{

 axios.put("https://collegemilan-backend-2.onrender.com/api/admin/home/home-page",data)
 .then(()=>alert("Home Page Updated"))

}

if(!data) return <p>Loading...</p>

return(

<Container className="mt-4">

<Card className="p-4 shadow">

<h3>Home Page Admin</h3>

<h5 className="mt-4">Hero Section</h5>

<Row>

<Col md={6}>

<Form.Group>

<Form.Label>Title</Form.Label>

<Form.Control
name="title"
value={data.heroSection.title}
onChange={handleHeroChange}
/>

</Form.Group>

</Col>

<Col md={6}>

<Form.Group>

<Form.Label>Description</Form.Label>

<Form.Control
name="description"
value={data.heroSection.description}
onChange={handleHeroChange}
/>

</Form.Group>

</Col>

</Row>

<Form.Group className="mt-3">

<Form.Label>Button Text</Form.Label>

<Form.Control
name="buttonText"
value={data.heroSection.buttonText}
onChange={handleHeroChange}
/>

</Form.Group>

<hr/>

<h5>SEO Settings</h5>

<Form.Group>

<Form.Label>Meta Title</Form.Label>

<Form.Control
value={data.metaTitle}
onChange={(e)=>setData({...data,metaTitle:e.target.value})}
/>

</Form.Group>

<Form.Group className="mt-3">

<Form.Label>Meta Description</Form.Label>

<Form.Control
value={data.metaDescription}
onChange={(e)=>setData({...data,metaDescription:e.target.value})}
/>

</Form.Group>

<Button
className="mt-4"
onClick={updatePage}
>

Save Changes

</Button>

</Card>

</Container>

)

} 

export default HomeAdmin;*/