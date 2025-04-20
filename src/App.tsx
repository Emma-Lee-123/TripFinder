// src/App.tsx
//import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchForm } from "./components/Search";

// function App() {
//   return (
//     <Container className="mt-5">
//       <Card>
//         <Card.Body>
//           <SearchForm />
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }
function App() {
  return (
    <div className="App"> {/* This can stay - Bootstrap will handle it */}
      <SearchForm />
    </div>
  )
}
export default App;