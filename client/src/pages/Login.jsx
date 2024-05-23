import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const Login = () => {

    const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } = useContext(AuthContext)

    return (
        <>
            <Form onSubmit={loginUser}>
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
                            <h2 className="link-light text-decoration-none">Login</h2>

                            <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo
                                ({ ...loginInfo, email: e.target.value })} />
                            <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo
                                ({ ...loginInfo, password: e.target.value })} />
                            <Button variant="primary" type="submit"> {/* แก้ "variabt" เป็น "variant" */}
                                {isLoginLoading ? "getting you in" : "login"}
                            </Button>
                            {loginError?.error && (
                                <Alert variant="danger">
                                    <p>{loginError?.message}</p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Login;