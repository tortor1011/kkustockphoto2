import React, { useState, useEffect } from 'react';
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '../../services/categoryAPI';

const CategoryManager = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

    // ตั้งเวลาเคลียร์ข้อความอัตโนมัติ
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage(null);
            setError(null);
        }, 3000);

        return () => clearTimeout(timer); // เคลียร์ Timer เมื่อ Component Unmount
    }, [successMessage, error]); // ทำงานเมื่อข้อความเปลี่ยนแปลง


    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        try {
            await createCategory(newCategory);
            setNewCategory('');
            loadCategories();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const startEdit = (category) => {
        setEditingId(category._id);
        setEditName(category.name);
    };

    const handleUpdate = async (id) => {
        try {
            await updateCategory(id, editName);
            setEditingId(null);
            loadCategories();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('แน่ใจว่าต้องการลบหมวดหมู่นี้?');
        if (!confirmDelete) return;

        try {
            const response = await deleteCategory(id); // รับ Response จาก API
            setSuccessMessage(response.data.message); // ตั้งค่าข้อความสำเร็จ
            setError(null);
            await loadCategories();
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setSuccessMessage(null);
        }
    };

    return (
        <div className="category-manager">
            <h2>จัดการหมวดหมู่</h2>
            {/* ข้อความสำเร็จ */}
            {successMessage && (
                <div className="alert alert-success">
                    ✅ {successMessage}
                </div>
            )}

            {/* ข้อความผิดพลาด */}
            {error && (
                <div className="alert alert-error">
                    ❌ {error}
                </div>
            )}

            {/* Form สร้างใหม่ */}
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="ชื่อหมวดหมู่ใหม่"
                />
                <button type="submit">เพิ่ม</button>
            </form>

            {/* ตารางแสดงหมวดหมู่ */}
            <table>
                <thead>
                    <tr>
                        <th>ชื่อหมวดหมู่</th>
                        <th>การกระทำ</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>
                                {editingId === category._id ? (
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td>
                                {editingId === category._id ? (
                                    <>
                                        <button onClick={() => handleUpdate(category._id)}>บันทึก</button>
                                        <button onClick={() => setEditingId(null)}>ยกเลิก</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEdit(category)}>แก้ไข</button>
                                        <button onClick={() => handleDelete(category._id)}>ลบ</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryManager;