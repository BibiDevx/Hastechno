<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Cliente extends Model
{
    use HasFactory;
    protected $table = 'cliente'; // Nombre correcto de la tabla en la BD
    protected $primaryKey = 'idCliente'; // Clave primaria correcta

    protected $fillable = [
        'nombreCliente',
        'apellidoCliente',
        'cedulaCliente',
        'telefonoCliente',
        'direccion',
        'idUsuario'
    ];
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'idUsuario');
    }
    protected $hidden = ['created_at', 'updated_at'];
}
