<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categoria';

    protected $primaryKey = 'idCategoria';

    protected $fillable = [
        'nombreCategoria'
    ];

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'categoriaproducto', 'idCategoria', 'idProducto');
    }
    protected $hidden = ['created_at', 'updated_at'];
}
