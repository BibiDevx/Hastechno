<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Marca extends Model
{
    use HasFactory;

    protected $table = 'marca';

    protected $primaryKey = 'idMarca';

    protected $fillable = [
        'nombreMarca'
    ];

    public function productos()
    {
        return $this->hasMany(Producto::class, 'idMarca');
    }
    protected $hidden = ['created_at', 'updated_at'];
}
