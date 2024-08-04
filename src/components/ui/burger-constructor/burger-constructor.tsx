import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';

import { Preloader, OrderDetailsUI } from '@ui';
import { BurgerConstructorElement, Modal } from '@components';

import type { FC } from 'react';
import type { TConstructorIngredient } from '@utils-types';
import type { BurgerConstructorUIProps } from './type';

import styles from './burger-constructor.module.css';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  isButtonDisabled,
  onOrderClick,
  closeOrderModal
}) => (
  <section className={styles.burger_constructor} data-cy='burger-constructor'>
    {constructorItems.bun ? (
      <div className={`${styles.element} mr-4`}>
        <ConstructorElement
          type='top'
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <ul className={`${styles.elements} mt-4 mb-4`}>
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map(
          (item: TConstructorIngredient, index: number) => (
            <BurgerConstructorElement
              ingredient={item}
              index={index}
              totalItems={constructorItems.ingredients.length}
              key={item.id}
            />
          )
        )
      ) : (
        <li
          className={`${styles.noBuns} mr-5 ml-8 text text_type_main-default`}
        >
          Выберите начинку
        </li>
      )}
    </ul>
    {constructorItems.bun ? (
      <div className={`${styles.element} mr-4`}>
        <ConstructorElement
          type='bottom'
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        children='Оформить заказ'
        disabled={isButtonDisabled}
        onClick={onOrderClick}
      />
    </div>

    {orderRequest && (
      <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
        <Preloader />
      </Modal>
    )}

    {orderModalData && (
      <Modal
        onClose={closeOrderModal}
        title={orderRequest ? 'Оформляем заказ...' : ''}
      >
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);
