<?php
require_once 'config.php';

// Get user's budgets
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id'])) {
    try {
        $stmt = $pdo->prepare('
            SELECT b.*, c.name as category_name 
            FROM budgets b 
            JOIN categories c ON b.category_id = c.id 
            WHERE b.user_id = ? AND b.month = ?
        ');
        $stmt->execute([$_GET['user_id'], date('Y-m-01')]);
        echo json_encode($stmt->fetchAll());
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Set budget
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare('
            INSERT INTO budgets (user_id, category_id, amount, month) 
            VALUES (?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE amount = ?
        ');
        $stmt->execute([
            $data['user_id'],
            $data['category_id'],
            $data['amount'],
            date('Y-m-01'),
            $data['amount']
        ]);
        
        echo json_encode(['message' => 'Budget set successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}