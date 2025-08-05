import CustomPageTitle from "@/components/custom-page-title"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <CustomPageTitle title="Add new prefix" />
            <div>{children}</div>
        </>
    )
}