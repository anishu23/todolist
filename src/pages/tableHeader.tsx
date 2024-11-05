import styles from "@/styles/Home.module.css";


export default function ToDoHeader() {
    return (
        <>
            <thead className={styles.theader}>
                <tr key={0}>
                    <th>Task ID</th>
                    <th>To Do Items</th>
                    <th>Completed</th>
                    <th>User ID</th>
                </tr>
            </thead>
        </>
    )
}