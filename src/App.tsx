import { ButtonMobile } from '@alfalab/core-components/button/mobile';

import { AmountInput } from '@alfalab/core-components/amount-input';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { PureCell } from '@alfalab/core-components/pure-cell';
import { Typography } from '@alfalab/core-components/typography';

import { Gap } from '@alfalab/core-components/gap';
import { Input } from '@alfalab/core-components/input';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import icon1 from './assets/icon1.png';
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon3.png';
import image from './assets/image.png';
import smile from './assets/smile.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

const creditConstants = {
  min: 10_000,
  max: 1_000_000,
};

export const App = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState('По адресу');
  const [address, setAddress] = useState('');
  const [day, setDay] = useState('Сегодня');
  const [time, setTime] = useState('');
  const [credit, setCredit] = useState(150_000);
  const [isTimeError, setIsTimeError] = useState(false);
  const [details, setDetails] = useState('');
  const [thx, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));

  const handleBlurInputCredit = () => {
    if (credit < creditConstants.min) {
      setCredit(creditConstants.min);
      return;
    }
    if (credit > creditConstants.max) {
      setCredit(creditConstants.max);
      return;
    }
  };

  const submit = () => {
    setLoading(true);
    // sendDataToGA({
    //   destination: deliveryType,
    //   address: deliveryType === 'По адресу' ? address : '',
    //   delivery_date: deliveryType === 'По адресу' ? day : '',
    //   delivery_time: deliveryType === 'По адресу' ? time : '',
    //   comments: deliveryType === 'По адресу' ? details : '',
    // }).then(() => {
    //   setLoading(false);
    //   LS.setItem(LSKeys.ShowThx, true);
    // });
    setLoading(false);
    LS.setItem(LSKeys.ShowThx, true);
    setThx(true);
  };

  useEffect(() => {
    if (time !== '') {
      setIsTimeError(false);
    }
  }, [time]);

  if (thx) {
    return <ThxLayout />;
  }

  return (
    <>
      {step === 1 && (
        <div className={appSt.container}>
          <div className={appSt.box}>
            <img src={image} alt="Карта для ребенка" style={{ width: '85%', borderRadius: '16px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false} weight="medium">
                  Кэшбэк до 50%
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  за покупки у партнёров
                </Typography.Text>
              </div>
              <div>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false} weight="medium">
                  Бесплатно
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  0 ₽ в первый год
                </Typography.Text>
              </div>
            </div>
          </div>

          <Gap size={48} />

          <Typography.TitleResponsive font="system" tag="h3" view="small" className={appSt.productsTitle}>
            Ваши преимущества
          </Typography.TitleResponsive>

          <Gap size={16} />

          <div className={appSt.benefits}>
            <div className={appSt.benefit}>
              <img src={icon1} alt="" width={48} height={48} style={{ objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                  Даем до 1 000 000 ₽
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Тратьте на ежедневные расходы или планируйте крупные покупки
                </Typography.Text>
              </div>
            </div>
            <div className={appSt.benefit}>
              <img src={icon2} alt="" width={48} height={48} style={{ objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                  60 дней без % на покупки
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Действуют на все покупки по карте. Период без процентов начинает действовать со дня совершения первой
                  покупки, возобновляется после погашений всей суммы долга
                </Typography.Text>
              </div>
            </div>
            <div className={appSt.benefit}>
              <img src={icon3} alt="" width={48} height={48} style={{ objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                  До 50% кэшбэка за покупки
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Каждый месяц собираем выгодные предложения, чтобы вы зарабатывали на покупках. Ищите их в разделе
                  Предложения партнёров
                </Typography.Text>
              </div>
            </div>
          </div>

          <Gap size={24} />

          <Typography.TitleResponsive font="system" tag="h3" view="small" className={appSt.productsTitle}>
            Выберите кредитный лимит
          </Typography.TitleResponsive>

          <Gap size={16} />

          <AmountInput
            value={credit}
            placeholder="Введите сумму"
            labelView="outer"
            label="Кредитный лимит"
            integersOnly
            bold={false}
            block
            size={48}
            hint="От 10 000 ₽ до 1 000 000 ₽"
            onChange={(_, { value }) => setCredit(value ?? 0)}
            minority={1}
            onBlur={handleBlurInputCredit}
          />
        </div>
      )}

      {step === 2 && (
        <div className={appSt.container}>
          <Gap size={32} />
          <Typography.TitleResponsive font="system" tag="h3" view="small" className={appSt.productsTitle}>
            Детали доставки
          </Typography.TitleResponsive>

          <Gap size={28} />

          <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
            <SwiperSlide
              onClick={() => setDeliveryType('По адресу')}
              className={appSt.swSlide({
                selected: deliveryType === 'По адресу',
              })}
            >
              <span>По адресу</span>
              <span>Через 2 часа</span>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => setDeliveryType('В офис банка')}
              className={appSt.swSlide({
                selected: deliveryType === 'В офис банка',
              })}
            >
              <span>В офис банка</span>
              <span>Сегодня</span>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => setDeliveryType('Кредитный счет')}
              className={appSt.swSlide({
                selected: deliveryType === 'Кредитный счет',
              })}
            >
              <span>Кредитный счет</span>
              <span>Моментально</span>
            </SwiperSlide>
          </Swiper>

          <Gap size={24} />

          <>
            {deliveryType === 'Кредитный счет' && (
              <>
                <Typography.TitleResponsive font="system" tag="h3" view="small" className={appSt.productsTitle}>
                  Кредитный счет
                </Typography.TitleResponsive>

                <Gap size={28} />

                <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
                  Подключите кредитный лимит к вашей дебетовой карте и пользуйтесь как кредиткой - без процентов на 60 дней
                </Typography.Text>

                <Gap size={8} />

                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Подключите кредитный лимит и вы сможете тратить деньги сразу же - без лишнего пластика. Если вам будет
                  необходима пластиковая версия карты, вы сможете выпустить ее отдельно.
                </Typography.Text>
                <Gap size={28} />
                <Typography.TitleResponsive font="system" tag="h3" view="small" className={appSt.productsTitle}>
                  Выберите карту
                </Typography.TitleResponsive>

                <Gap size={28} />

                <div className={appSt.boxRow}>
                  <PureCell verticalPadding="none">
                    <PureCell.Graphics verticalAlign="center">
                      <img src={image} width={56} height={36} alt="" />
                    </PureCell.Graphics>
                    <PureCell.Content>
                      <PureCell.Main>
                        <Typography.Text view="primary-medium">Ваша дебетовая Альфа-карта</Typography.Text>
                      </PureCell.Main>
                    </PureCell.Content>
                    <PureCell.Addon verticalAlign="center">
                      <Checkbox size={'m'} checked className={appSt.checkBox} />
                    </PureCell.Addon>
                  </PureCell>
                </div>
              </>
            )}
            {deliveryType === 'По адресу' && (
              <>
                <Input
                  placeholder="Проспект Ленина, 12, кв 24"
                  block={true}
                  labelView={'inner'}
                  size={48}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />

                <Gap size={48} />

                <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
                  Дата и время
                </Typography.Text>

                <Gap size={24} />

                <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                  <SwiperSlide
                    onClick={() => {
                      setDay('Сегодня');
                      setTime('');
                    }}
                    className={appSt.swSlideOneLine({
                      selected: day === 'Сегодня',
                    })}
                  >
                    Сегодня
                  </SwiperSlide>
                  <SwiperSlide
                    onClick={() => {
                      setDay('Завтра');
                      setTime('');
                    }}
                    className={appSt.swSlideOneLine({
                      selected: day === 'Завтра',
                    })}
                  >
                    Завтра
                  </SwiperSlide>
                  <SwiperSlide
                    onClick={() => {
                      setDay('Послезавтра');
                      setTime('');
                    }}
                    className={appSt.swSlideOneLine({
                      selected: day === 'Послезавтра',
                    })}
                  >
                    Послезавтра
                  </SwiperSlide>
                </Swiper>

                <Gap size={24} />

                {day === 'Сегодня' && (
                  <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                    <SwiperSlide
                      onClick={() => setTime('Через 2 часа')}
                      className={appSt.swSlideOneLine({
                        selected: time === 'Через 2 часа',
                      })}
                    >
                      Через 2 часа
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('Через 4 часов')}
                      className={appSt.swSlideOneLine({
                        selected: time === 'Через 4 часов',
                      })}
                    >
                      Через 4 часа
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('Через 6 часов')}
                      className={appSt.swSlideOneLine({
                        selected: time === 'Через 6 часов',
                      })}
                    >
                      Через 6 часов
                    </SwiperSlide>
                  </Swiper>
                )}

                {day === 'Завтра' && (
                  <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                    <SwiperSlide
                      onClick={() => setTime('10:00—12:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '10:00—12:00',
                      })}
                    >
                      10:00—12:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('12:00—14:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '12:00—14:00',
                      })}
                    >
                      12:00—14:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('14:00—16:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '14:00—16:00',
                      })}
                    >
                      14:00—16:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('16:00—18:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '16:00—18:00',
                      })}
                    >
                      16:00—18:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('18:00—20:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '18:00—20:00',
                      })}
                    >
                      18:00—20:00
                    </SwiperSlide>
                  </Swiper>
                )}

                {day === 'Послезавтра' && (
                  <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                    <SwiperSlide
                      onClick={() => setTime('10:00—12:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '10:00—12:00',
                      })}
                    >
                      10:00—12:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('12:00—14:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '12:00—14:00',
                      })}
                    >
                      12:00—14:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('14:00—16:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '14:00—16:00',
                      })}
                    >
                      14:00—16:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('16:00—18:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '16:00—18:00',
                      })}
                    >
                      16:00—18:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('18:00—20:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '18:00—20:00',
                      })}
                    >
                      18:00—20:00
                    </SwiperSlide>
                  </Swiper>
                )}

                {isTimeError && (
                  <>
                    <Gap size={8} />
                    <Typography.Text tag="p" view="primary-medium" color="negative" defaultMargins={false}>
                      Для заказа карты необходимо выбрать время доставки
                    </Typography.Text>
                  </>
                )}

                <Gap size={48} />

                <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
                  Детали и уточнения
                </Typography.Text>

                <Gap size={24} />

                <Input
                  placeholder="Комментарий сотруднику банка"
                  block={true}
                  labelView={'inner'}
                  size={48}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                />
              </>
            )}
            {deliveryType === 'В офис банка' && (
              <div className={appSt.reminder}>
                <img src={smile} alt="" width={20} height={20} style={{ marginRight: '1rem' }} />
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Мы свяжемся с вами в ближайшее время для уточнения ближайшего офиса банка!
                </Typography.Text>
              </div>
            )}
          </>
        </div>
      )}

      <Gap size={96} />

      {step === 1 && (
        <div className={appSt.bottomBtnThx}>
          <ButtonMobile onClick={() => setStep(2)} block view="primary">
            Продолжить
          </ButtonMobile>
        </div>
      )}

      {step === 2 && (
        <div className={appSt.bottomBtnThx}>
          <ButtonMobile
            loading={loading}
            onClick={() => {
              if (!time && deliveryType === 'По адресу') {
                setIsTimeError(true);
              } else {
                submit();
              }
            }}
            block
            view="primary"
          >
            Оформить
          </ButtonMobile>
        </div>
      )}
    </>
  );
};
