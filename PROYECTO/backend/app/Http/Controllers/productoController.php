<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Http\Controllers\BaseController;

class productoController extends BaseController
{
    public function home()
    {
        $productos = Producto::select('idProducto', 'nombreProducto', 'valorProducto')
            ->where('disponibilidad', 1)
            ->latest()
            ->take(9)
            ->get();

        return $this->sendResponse($productos, 'Productos más recientes obtenidos correctamente');
    }
    
    public function detalles()
    {
        ///Admin solo ve el de detalles ya que son todos los productos con su categoria y marca
        $productos = Producto::with(['marca', 'categorias'])->get();
        return $this->sendResponse($productos, 'Detalles de productos obtenidos correctamente');
    }

    public function index()
    {
        $productos = Producto::select('idProducto', 'nombreProducto', 'valorProducto')
            ->with(['categorias'])
            ->where('disponibilidad', 1)
            ->get();

        return $this->sendResponse($productos, 'Lista de productos disponibles');
    }
    public function productosPorMarca($idMarca)
    {
        $productos = Producto::select('idProducto', 'nombreProducto', 'valorProducto')
            ->where('idMarca', $idMarca)->get();
        return response()->json($productos);
    }

    public function show($id)
    {
        $producto = Producto::with(['marca', 'categorias'])
            ->select('idProducto', 'nombreProducto', 'valorProducto', 'definicion', 'idMarca')
            ->find($id);

        if (!$producto) {
            return $this->sendError('Producto no encontrado');
        }

        return $this->sendResponse($producto, 'Producto obtenido correctamente');
    }

    public function store(Request $request)
    {
        // Validación de los campos de entrada
        $request->validate([
            'nombreProducto' => 'required|string|max:255',
            'definicion' => 'required|string', // Aseguramos que se pase 'definicion'
            'valorProducto' => 'required|numeric',
            'disponibilidad' => 'required|boolean',
            'idMarca' => 'required|exists:marca,idMarca',
            'idProveedor' => 'required|exists:proveedor,idProveedor',
        ]);
    
        // Creamos el nuevo producto asegurándonos de que 'definicion' nunca sea nulo
        $producto = Producto::create([
            'nombreProducto' => $request->nombreProducto,
            'definicion' => $request->definicion ?: '', // Si 'definicion' es vacío o null, asigna una cadena vacía
            'valorProducto' => $request->valorProducto,
            'disponibilidad' => $request->disponibilidad,
            'idMarca' => $request->idMarca,
            'idProveedor' => $request->idProveedor,
        ]);
    
        // Retornamos una respuesta con el producto creado
        return response()->json($producto, 201);
    }


    public function updatePartial(Request $request, $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return $this->sendError('Producto no encontrado');
        }

        $request->validate([
            'nombreProducto' => 'sometimes|string|max:255',
            'definicion' => 'sometimes|nullable|string',
            'valorProducto' => 'sometimes|numeric',
            'disponibilidad' => 'sometimes|boolean',
            'idMarca' => 'sometimes|exists:marca,idMarca',
            'idProveedor' => 'sometimes|exists:proveedor,idProveedor',
            'categorias' => 'sometimes|array',
            'categorias.*' => 'exists:categoria,idCategoria'
        ]);

        $producto->fill($request->only([
            'nombreProducto',
            'definicion',
            'valorProducto',
            'disponibilidad',
            'idMarca',
            'idProveedor'
        ]));

        $producto->save();

        if ($request->has('categorias')) {
            $producto->categorias()->sync($request->categorias);
        }

        return $this->sendResponse($producto->load(['marca', 'categorias']), 'Producto actualizado correctamente');
    }

    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return $this->sendError('Producto no encontrado');
        }

        $producto->delete();

        return $this->sendResponse([], 'Producto eliminado correctamente');
    }
}
