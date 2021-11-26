from datetime import datetime
import pandas as pd
root_dir = 'static/assets/data/'

def load_patient_data(btnValue):
    csv_dir = root_dir + f'patient/result_{btnValue}_patient.csv'
    

    df = pd.read_csv(csv_dir)
    label, data = df['date'].to_list(), df['total'].to_list()
    
    return label, data


def load_sexAge_data(btnValue):
    male_csv_dir = root_dir + f'sexAge/counts_male.csv'
    female_csv_dir = root_dir + f'sexAge/counts_female.csv'
    pie_csv_div = root_dir + f'sexAge/total_cost.csv'

    # bar chart
    male_df = pd.read_csv(male_csv_dir)
    female_df = pd.read_csv(female_csv_dir)

    label = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80']
    
    male_data, female_data = male_df[btnValue].to_list(), female_df[btnValue].to_list()

    # pie chart
    cost_df = pd.read_csv(pie_csv_div)
    cost_result = cost_df[btnValue].to_list()
    

    data = [male_data[1:], female_data[1:], cost_result]

    return label, data

def load_total_data(keyword):
    keyword = pd.read_csv(root_dir + f'keyword/{keyword}(naver,twitter).csv')
    # total_emotion = pd.read_csv(root_dir + 'keyword/total_emotion(naver,twitter).csv')
    # total_mood = pd.read_csv(root_dir + 'keyword/total_daily(naver,twitter).csv')

    data = {
        'label': keyword['data'].to_list(),
        'positive': keyword['positive'].to_list(),
        'negative': keyword['negative'].to_list()
    }

    return data

def load_platform_data(keyword):
    label, data = None, None
    return label, data