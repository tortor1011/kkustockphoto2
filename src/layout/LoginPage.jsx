import { useUser } from '../Hooks/UserContext';

const LoginPage = () => {
    const { setUser } = useUser();

    const handleLogin = () => {
        // สมมติว่าผู้ใช้กรอกอีเมลและกดล็อกอินสำเร็จ
        const userData = { email: 'metee.th@kkumail.com' }; // อีเมลที่ได้จากระบบ
        setUser(userData); // อัปเดต Context
    };

    return (
        <div>
            <button onClick={handleLogin}>Login as Metee</button>
        </div>
    );
};

export default LoginPage;
