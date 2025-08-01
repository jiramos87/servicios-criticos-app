import { Farmacia } from '../models/index.js';

export const getFarmacias = async (req, res) => {
  try {
    const { activo = true, limite = 50, pagina = 1 } = req.query;

    const offset = (pagina - 1) * limite;

    const whereClause = {};
    if (activo !== undefined) {
      whereClause.activo = activo === 'true';
    }

    const farmacias = await Farmacia.findAndCountAll({
      where: whereClause,
      limit: parseInt(limite),
      offset: parseInt(offset),
      order: [['nombre', 'ASC']],
    });

    res.json({
      farmacias: farmacias.rows,
      total: farmacias.count,
      pagina: parseInt(pagina),
      totalPaginas: Math.ceil(farmacias.count / limite),
    });
  } catch (error) {
    console.error('Error al obtener farmacias:', error);
    res.status(500).json({ error: 'Error al obtener farmacias' });
  }
};

export const getFarmaciaById = async (req, res) => {
  try {
    const { id } = req.params;

    const farmacia = await Farmacia.findByPk(id);

    if (!farmacia) {
      return res.status(404).json({ error: 'Farmacia no encontrada' });
    }

    res.json(farmacia);
  } catch (error) {
    console.error('Error al obtener farmacia:', error);
    res.status(500).json({ error: 'Error al obtener farmacia' });
  }
};

export const createFarmacia = async (req, res) => {
  try {
    const farmacia = await Farmacia.create(req.body);
    res.status(201).json({
      message: 'Farmacia creada exitosamente',
      farmacia,
    });
  } catch (error) {
    console.error('Error al crear farmacia:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Datos de farmacia inválidos',
        detalles: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ error: 'Error al crear farmacia' });
  }
};

export const updateFarmacia = async (req, res) => {
  try {
    const { id } = req.params;

    const farmacia = await Farmacia.findByPk(id);
    if (!farmacia) {
      return res.status(404).json({ error: 'Farmacia no encontrada' });
    }

    await farmacia.update(req.body);

    res.json({
      message: 'Farmacia actualizada exitosamente',
      farmacia,
    });
  } catch (error) {
    console.error('Error al actualizar farmacia:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Datos de farmacia inválidos',
        detalles: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ error: 'Error al actualizar farmacia' });
  }
};

export const deleteFarmacia = async (req, res) => {
  try {
    const { id } = req.params;

    const farmacia = await Farmacia.findByPk(id);
    if (!farmacia) {
      return res.status(404).json({ error: 'Farmacia no encontrada' });
    }

    await farmacia.destroy();

    res.json({ message: 'Farmacia eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar farmacia:', error);
    res.status(500).json({ error: 'Error al eliminar farmacia' });
  }
};

// Listar TOP N farmacias cercanas a una ubicación
export const getFarmaciasCercanas = async (req, res) => {
  try {
    const { latitud, longitud, n } = req.query;
    const lat = parseFloat(latitud);
    const lon = parseFloat(longitud);
    const topN = parseInt(n);

    // Traer solo farmacias activas
    const farmacias = await Farmacia.findAll({
      where: { activo: true },
      attributes: [
        'id',
        'nombre',
        'direccion',
        'telefono',
        'horario_apertura',
        'horario_cierre',
        'latitud',
        'longitud',
        'activo',
      ],
    });

    // Calcular distancia usando la fórmula de Haversine
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km
    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const farmaciasConDistancia = farmacias.map((f) => {
      const distancia = calcularDistancia(lat, lon, parseFloat(f.latitud), parseFloat(f.longitud));
      return { ...f.toJSON(), distancia };
    });

    // Ordenar por distancia y tomar el top N
    farmaciasConDistancia.sort((a, b) => a.distancia - b.distancia);
    const topFarmacias = farmaciasConDistancia.slice(0, topN);

    res.json({ farmacias: topFarmacias });
  } catch (error) {
    console.error('Error al obtener farmacias cercanas:', error);
    res.status(500).json({ error: 'Error al obtener farmacias cercanas' });
  }
};
