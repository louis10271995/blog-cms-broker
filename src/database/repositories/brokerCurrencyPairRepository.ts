import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import Sequelize from 'sequelize';
import SequelizeRepository from './sequelizeRepository';

const Op = Sequelize.Op;

class BrokerCurrencyPairRepository {
  static ALL_FIELDS = ['currency', 'url'];
  static NOT_EMPTY_FIELDS = [];

  static _relatedData(data, options) {
    SequelizeRepository.handleNotEmptyField(
      data,
      this.NOT_EMPTY_FIELDS,
      options.language,
      'broker_currency_pair',
    );
    return {
      currency: data.currency || '',
      url: data.url || '',
      broker_id: data.broker || null,
      ip: data.ip || '',
    };
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.broker_currency_pair.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data, options),
      },
      {
        transaction,
      },
    );
  }

  static async destroyByBroker(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.broker_currency_pair.destroy({
      where: {
        broker_id: id,
      },
      transaction,
    });
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];

    const include = [];

    if (filter) {
      ['broker_id'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push({
            [field]: filter[field],
          });
        }
      });

      [].forEach((field) => {
        if (
          filter[field] === true ||
          filter[field] === 'true' ||
          filter[field] === false ||
          filter[field] === 'false'
        ) {
          whereAnd.push({
            [field]:
              filter[field] === true ||
              filter[field] === 'true',
          });
        }
      });
    }

    const where = { [Op.and]: whereAnd };

    let { rows, count } =
      await options.database.broker_currency_pair.findAndCountAll(
        {
          where,
          include,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order: orderBy
            ? [orderBy.split('_')]
            : [['id', 'ASC']],
          transaction:
            SequelizeRepository.getTransaction(options),
        },
      );

    return { rows, count };
  }
}

export default BrokerCurrencyPairRepository;
