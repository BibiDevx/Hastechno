<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Proveedor extends Model
{
    use HasFactory;

    protected $table = 'proveedor';

    protected $primaryKey = 'idProveedor';

    protected $fillable = [
        'idProveedor',
        'nombreProveedor',
        'correoProveedor',
        'telefonoProveedor'
    ];

    public function productos()
    {
        return $this->hasMany(Producto::class, 'idProveedor');
    }
}
