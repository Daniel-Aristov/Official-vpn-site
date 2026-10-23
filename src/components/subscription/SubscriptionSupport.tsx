import { MailIcon } from '@/components/icons/MailIcon'
import { TelegramIcon } from '@/components/icons/TelegramIcon'
import { ActionLink } from '@/components/UI/ActionLink'
import { CheckoutCard } from './CheckoutCard'
import { CopyAction } from './CopyAction'

const supportEmail = 'support@oflvpn.com'

export function SubscriptionSupport() {
  return (
    <CheckoutCard
      id="subscription-support"
      className="border border-white-10 p-[15px]"
      aria-labelledby="support-title"
    >
      <h2 id="support-title" className="font-medium">
        Поддержка
      </h2>
      <CheckoutCard className="border border-white-10 p-[15px]">
        <div className="flex items-start gap-3">
          <span className="flex size-[46px] shrink-0 items-center justify-center rounded-2xl bg-white-10">
            <TelegramIcon />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">
                Чат поддержки в Telegram
              </h3>
              <p className="break-all text-white-80">@vpnbot_support</p>
            </div>
            <ActionLink
              href="https://t.me/vpnbot_support"
              target="blank"
              className="self-start"
              size="small"
              fullWidth={false}
            >
              Перейти в Telegram
            </ActionLink>
          </div>
        </div>
      </CheckoutCard>
      <CheckoutCard className="border border-white-10 p-[15px]">
        <div className="flex items-start gap-3">
          <span className="flex size-[46px] shrink-0 items-center justify-center rounded-2xl bg-white-10">
            <MailIcon />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">
                Наша почта для обращений
              </h3>
              <p className="break-all select-all text-white-80">
                {supportEmail}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ActionLink
                href={`mailto:${supportEmail}`}
                size="small"
                fullWidth={false}
                className="min-w-0"
              >
                Написать нам
              </ActionLink>
              <CopyAction
                value={supportEmail}
                label="Скопировать почту поддержки"
              />
            </div>
          </div>
        </div>
      </CheckoutCard>
    </CheckoutCard>
  )
}
