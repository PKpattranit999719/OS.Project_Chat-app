import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const Register = () => {

    const {registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterLoading} = useContext(AuthContext)

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            paddingTop: "10%",
            height: "50vh",
            justifyContent: "center", // แก้จาก "justfyContent" เป็น "justifyContent"
            alignItems: "center", // เพิ่มบรรทัดนี้เพื่อกำหนดให้อยู่ตรงกลาง
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>
              <Form.Control type="text" placeholder="Name" onChange={(e) => updateRegisterInfo
            ({...registerInfo,name: e.target.value})}/>
              <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo
            ({...registerInfo,email: e.target.value})}/>
              <Form.Control type="password" placeholder="Password" onChange={(e) => updateRegisterInfo
            ({...registerInfo,password: e.target.value})}/>
              <Button variant="primary" type="submit"> {/* แก้ "variabt" เป็น "variant" */}
                {isRegisterLoading?"creating your account":"register"}
              </Button>
                {registerError?.error && (
                    <Alert variant="danger">
                        <p>{registerError?.message}</p>
                    </Alert>
                )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
