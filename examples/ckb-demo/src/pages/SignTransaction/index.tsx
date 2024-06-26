import { useRef, useState } from 'react'
import {
  Button,
  Textarea,
  VStack,
  useToast,
  Input,
  Alert,
  AlertIcon,
  Link,
  AlertDescription,
  AlertTitle,
  Text,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { atom, useAtom } from 'jotai'
import { Navigate, useNavigate } from 'react-router-dom'
import { useObservableCallback, useSubscription } from 'observable-hooks'
import { map, debounceTime } from 'rxjs/operators'
import { signTransaction } from '@joyid/ckb'
import { useAccount } from '../../hooks'
import { RoutePath } from '../../route/path'
import { rpc } from '../../lumos'

const defaultAddress =
  'ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqqxv6drphrp47xalweq9pvr6ll3mvkj225quegpcw'

const toAddressAtom = atom<string>(defaultAddress)
const amountAtom = atom<string>('100')

const useToastError = () => {
  const toast = useToast()
  return (error: unknown) => {
    if (error instanceof Error) {
      toast({
        title: error.name,
        description: error.message,
        status: 'error',
      })
    } else {
      toast({
        title: 'Unknown Error',
        description: 'See devtool console for more details',
      })
    }

    console.error(error)
  }
}

export function SignTransaction() {
  const [toAddress, setToAddress] = useAtom(toAddressAtom)
  const [amount, setAmount] = useAtom(amountAtom)
  const [txHash, setTxHash] = useState('')
  const toastError = useToastError()
  const [isTransferring, setIsTransferring] = useState(false)
  const account = useAccount()
  const addressRef = useRef<HTMLTextAreaElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const navi = useNavigate()

  const [addressChange, addressChange$] = useObservableCallback<
    string,
    React.ChangeEvent<HTMLTextAreaElement>
  >((event$) =>
    event$.pipe(
      map((e) => e.target.value),
      debounceTime(500)
    )
  )

  useSubscription(addressChange$, async (toAddr: string) => {
    setToAddress(toAddr)
  })

  const [amountChange, amountChange$] = useObservableCallback<
    string,
    React.ChangeEvent<HTMLInputElement>
  >((event$) =>
    event$.pipe(
      map((e) => e.target.value),
      debounceTime(500)
    )
  )

  useSubscription(amountChange$, async (val: string) => {
    setAmount(val)
  })

  if (!account) {
    return <Navigate to={RoutePath.Root} replace />
  }

  return (
    <div className="App">
      <VStack spacing={6}>
        <FormControl>
          <FormLabel>To Address:</FormLabel>
          <Textarea
            name="message"
            defaultValue={defaultAddress}
            placeholder="To address"
            onChange={addressChange}
            ref={addressRef}
          />
        </FormControl>
        <FormControl>
          <FormLabel>CKB Amount:</FormLabel>
          <Input
            defaultValue="100"
            type="number"
            onChange={amountChange}
            placeholder="amount"
          />
        </FormControl>
        {txHash ? (
          <Alert
            status="success"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            variant="subtle">
            <AlertIcon />
            <AlertTitle>Transfer Successful</AlertTitle>
            <AlertDescription>
              <Text>{`The transaction hash is: `}</Text>
              <Link
                href={`https://pudge.explorer.nervos.org/transaction/${txHash}`}
                isExternal
                wordBreak="break-all"
                textDecoration="underline">
                {txHash}
                <ExternalLinkIcon mx="2px" />
              </Link>
            </AlertDescription>
          </Alert>
        ) : null}
        <Button
          colorScheme="teal"
          w="240px"
          isLoading={isTransferring}
          loadingText={'Transferring...'}
          onClick={async () => {
            if (account == null) {
              return
            }
            setIsTransferring(true)
            try {
              const signedTx = await signTransaction({
                to: toAddress,
                from: account.address,
                amount: BigInt(Number(amount) * 10 ** 8).toString(),
              })
              const hash = await rpc.sendTransaction(signedTx, 'passthrough')
              setTxHash(hash)
            } catch (error) {
              toastError(error)
            } finally {
              setIsTransferring(false)
            }
          }}>
          Transfer
        </Button>
        <Button
          colorScheme="red"
          w="240px"
          variant="outline"
          onClick={() => {
            setToAddress('')
            if (addressRef.current) {
              addressRef.current.value = ''
            }
            setAmount('100')
            if (amountRef.current) {
              amountRef.current.value = '100'
            }
            setTxHash('')
          }}>
          Reset
        </Button>
        <Button
          colorScheme="purple"
          onClick={() => {
            navi(RoutePath.Home)
          }}>
          {`<< Go Home`}
        </Button>
      </VStack>
    </div>
  )
}
