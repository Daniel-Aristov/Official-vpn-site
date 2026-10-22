import { CheckoutCard } from './CheckoutCard'
import { CopyAction } from './CopyAction'
import { ActionLink } from '@/components/UI/ActionLink'
import { LinkIcon } from '@/components/icons/LinkIcon'

const demoConnectionUrl = 'https://a.my-keyboards.shop/cart/5cTnP39oZ_Ja9peR'

export function ConnectionDetails() {
  return (
    <>
      <CheckoutCard aria-labelledby="setup-title">
        <div className="flex flex-col gap-2">
          <h2 id="setup-title" className="font-medium">
            Инструкция для подключения
          </h2>
          <p className="text-checkout-gray">
            Нажмите на кнопку ниже, чтобы перейти в личный кабинет и настроить
            VPN.
          </p>
        </div>
        <ActionLink href="https://oflvpn.com/setup" target="blank">
          Перейти к настройке
        </ActionLink>
      </CheckoutCard>
      <CheckoutCard aria-labelledby="connection-link-title">
        <div className="flex flex-col gap-2">
          <h2 id="connection-link-title" className="font-medium">
            Хотите подключить другое устройство?
          </h2>
          <p className="text-checkout-gray">
            Отсканируйте QR-код его камерой — и мы вас направим в личный кабинет
            с инструкцией.
          </p>
        </div>
        <figure className="flex flex-col items-center gap-2 py-2">
          <img
            src="/assets/connection-qr.svg"
            alt="Демонстрационный QR-код подключения из макета"
            width="200"
            height="200"
          />
        </figure>
        <div className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-2 ring-1 ring-white-10 ring-inset">
          <LinkIcon className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white-80">Ваша ссылка:</p>
            <p
              className="truncate select-all font-medium"
              title={demoConnectionUrl}
            >
              {demoConnectionUrl}
            </p>
          </div>
          <CopyAction
            value={demoConnectionUrl}
            label="Скопировать ссылку для подключения"
          />
        </div>
      </CheckoutCard>
    </>
  )
}
