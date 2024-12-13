<?php
require_once 'config.php';

// Get all categories
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $type = isset($_GET['type']) ? $_GET['type'] : null;
        
        if ($type) {
            $stmt = $pdo->prepare('SELECT * FROM categories WHERE type = ? ORDER BY name');
            $stmt->execute([$type]);
        } else {
            $stmt = $pdo->query('SELECT * FROM categories ORDER BY type, name');
        }
        
        echo json_encode($stmt->fetchAll());
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}