-- SQLBook: Code
Create database Inventario;
use Inventario;

create table Tipo_documento ( 
t_doc varchar (10) primary key,
desc_tdoc varchar (45) not null,
tdoc_estado TINYINT not null

);

Create table roles(
cod_rol Int,
desc_rol varchar(30) not null,
primary key (cod_rol)

);

create table pregunta_seguridad (
    id_pregunta int not null,
    pregunta_seg varchar(45) not null,
    rest_pregunta boolean,
    primary key (n_pregunta)
);


Create table usuario(
Fk_Pk_t_doc varchar(10) not null,
id_usuario varchar (45) not null,
nombre varchar (45) not null,
apellido varchar (45) not null,
telefono varchar(20) not null,
pass_usuario varchar(10) not null,
fk_pk_n_pregunta int not null,
rest_pass varchar(100) not null,
primary key(id_usuario,Fk_Pk_t_doc),
foreign key (fk_pk_n_pregunta) references pregunta_seguridad(n_pregunta),
foreign key (Fk_Pk_t_doc) references Tipo_documento(t_doc)
);

Create table roles_has_usuario(
Fk_Pk_cod_rol int not null,
Fk_Pk_t_doc varchar(10) not null,
Fk_pk_id_usuario varchar (45) not null,
estado_rol int not null,
primary key(Fk_Pk_t_doc,Fk_pk_id_usuario,Fk_Pk_cod_rol),
foreign key (Fk_pk_id_usuario) references usuario(id_usuario)on delete cascade,
foreign key (Fk_Pk_t_doc) references usuario(Fk_Pk_t_doc)on delete cascade,
foreign key (Fk_Pk_cod_rol) references roles(cod_rol)on delete cascade
);


Create table categorias(
id_categoria varchar (25) not null,
desc_categoria varchar (25) not null,
primary key (id_categoria)
);

Create table Proveedores (
id_proveedores Int(5),
Nomb_proveedor Varchar(45) Not null,
Tel_proveedor Varchar(10) Not null,
Email_proveedor Varchar(45)  null,
primary key (id_proveedores)

);

Create table Productos(

id_Productos varchar (25) not null,
Fk_Pk_id_proveedor int (5) not null,
Nomb varchar(45) not null,
Marca varchar(45) null,
Forma_farmaceutica varchar(20) null,
Lote_fabricacion datetime null,
Fecha_caducidad datetime  null,
Precio boolean not null,
stock_maximo int(5) not null,
stock_minimo int(5) not null,
primary key (id_Productos, Fk_Pk_id_proveedor),
foreign key (Fk_Pk_id_proveedor) references Proveedores (id_proveedores) on delete cascade

);

Create table categorias_has_productos(
Fk_Pk_id_categoria varchar (25) not null,
Fk_Pk_id_Productos varchar (25) not null,
primary key (Fk_Pk_id_categoria,Fk_Pk_id_Productos),
foreign key (Fk_Pk_id_categoria) references categorias(id_categoria)on delete cascade,
foreign key (Fk_Pk_id_Productos) references Productos(id_Productos)on delete cascade
);


insert into Tipo_documento
values ("C.C","Cedula de ciudadania","1"),
("T.I","Tarjeta de identidad","1"),
("C.E","Cedula Extranjera","1"),
("NIT","Numero de identificacion tributario","0");

insert into roles
values ("1","Administrador"),
("2","Empleado"),
("3","cliente");

insert into pregunta_seguridad
values ("1","Cual es el nombre de tu primera novia?","Josefa"),
("2","Cual es el nombre de tu primer mascota?","Palucio"),
("3","cual es tu color favorito? ","amarillo");

insert into usuario
values ("C.C","1025525485","Juan Manuel","Guzman","3058190723","10323454","1","Josefa"),
("C.E","1029425485","Faver","Alonso Merchan","3049382284","12amp","2","Palucio"),
("T.I","1029424345","Valentina","Perez Rodriguez","3049356784","valenfose21","3","amarillo"),
("C.E","1029478345","Sahir Manolo","Grosso Yepes","3049456784","smgp1153","3","rosa");

insert into roles_has_usuario
values("2","C.C","1025525485","1"),
("3","C.E","1029425485","1"),
("3","T.I","1029424345","1"),
("1","C.E","1029478345","1");


insert into Proveedores
values ('1876543210','tecnoquimicas ','315-234-5678','info.data@tecnoquimicas.com'),
('1543210987','Bayer','3237890123','bayerandina@bayer.com'),
('876543210','Aboot','7422525','DistritoCapital.abbott.com'),
('154321098','sanofi','576214400','Cliente@sanofi.com'),
('121212121','johnson & johnson','900228400','clientes@ csces.jnj.com'),
('131313131','unilever','6014239700','inilever@contac.com'),
('141414141','veet','6017469000','veet@depila.com'),
('151515151','colgate','32132132','colgateprofesional@colgateprofesional.net');

insert into categorias
values ("4","medicamentos"),
("5","productos_variados");

insert into Productos
values("P1","121212121","shampoo_konzil_530ml","Konzil","","17/08/2023","17/08/2026","20000","30000","100","50"),
("P2","141414141","Crema_depilatoria_veet_200ml","veet","","12/2/2023","12/2/2025","16000","20000","200","100"),
("M3","1876543210","Acetaminofen","","Solidas","16/12/2023","16/12/2026","1000","5000","300","150"),
("M4","154321098","Amoxicilina","","Liquidas","23/02/2023","23/02/2025","12000","22000","400","200"),
("P5","131313131","esmalte_vogge","vogge","","2/11/2023","2/11/2026","6000","10000","500","250"),
("P6","151515151","Crema_dental_colgate_63ml","colgate","","23/02/2023","23/02/2025","5000","15000","600","300"),
("M7","1543210987","Diclofenaco","","Gaseosas","18/11/2023","18/11/2024","6000","10000","700","350"),
("M8","876543210","Alcohol_Etilico","","Liquidas","16/12/2023","16/12/2026","5000","10000","800","400"),
("P9","131313131","Crema_Ponds","Ponds","","26/6/2023","6/2/2026","30000","40000","900","450"),
("P10","121212121","Tinte_Koleston","Koleston","","26/6/2023","6/2/2026","30000","40000","900","450");

insert into categorias_has_productos
values("5","P1"),
("5","P2"),
("4","M3"),
("4","M4"),
("5","P5"),
("5","P6"),
("4","M7"),
("4","M8"),
("5","P9"),
("5","P10");




