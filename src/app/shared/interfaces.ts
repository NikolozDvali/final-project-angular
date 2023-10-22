export interface Account{
    account_type: string, 
    account_name: string,
    account_email: string,
    account_password: string,
    account_classes: ClassNames[],
}

export interface ClassNames{
    id: string,
    class_name: string,
}

export interface IAccount extends Account{
    id: string,
}

export interface Class{
    class_name: string,
    class_owner: Owner;
    class_members: Member[],
    class_posts: IPost[],
}

export interface IClass extends Class{
    id: string
}

export interface Owner{
    owner_id: string,
    owner_name: string,
}

export interface Member{
    member_id: string,
    member_name: string,
    member_grades: Grade[],
}

export interface Grade{
    grade: number,
    date: string,
    comment: string,
}

export interface Post{
    post_title: string,
    post_text: string,
    post_date: string,
}

export interface IPost extends Post{
    post_id: string,
}

export type loggedInAccount = IAccount | undefined;
export type chosenClass = IClass | undefined;