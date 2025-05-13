<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Model
{
    use HasFactory;

    protected $table = 'admin';

    protected $primaryKey = 'idAdmin';

    protected $fillable = [
        'idUsuario',
        'nombreAdmin',
        'apellidoAdmin',
        'cedulaAdmin',
        'telefonoAdmin'
    ];
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'idUsuario');
    }
    protected $hidden = ['created_at', 'updated_at'];

}
