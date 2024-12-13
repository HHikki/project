<?php
require_once 'config.php';

try {
    $stmt = $pdo->query('SELECT 1');
    echo json_encode(['status' => 'success', 'message' => 'Conexión exitosa']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}